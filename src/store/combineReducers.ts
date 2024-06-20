import { Dispatch, Reducer, useReducer, useRef } from 'react';
import { FormStepsAction, IFormStepsState } from '../reducers/formStepsReducer/formStepsReducer.ts';
import { AppAction, IAppState } from '../context/AppReducer.ts';

export type Middleware<State, Action> = (store: {
  getState: () => State;
  dispatch: Dispatch<Action>;
}) => (next: Dispatch<Action>) => Dispatch<Action>;

const applyMiddleware = <State, Action>(
  middlewares: Middleware<State, Action>[],
  store: { getState: () => State; dispatch: Dispatch<Action> }
) => {
  let dispatch = store.dispatch;
  const middlewareAPI = {
    getState: store.getState,
    dispatch: (action: Action) => dispatch(action),
  };

  const chain = middlewares.map(middleware => middleware(middlewareAPI));
  dispatch = chain.reduceRight((next, mw) => mw(next), dispatch);

  return dispatch;
};

export const combineReducers = <State, Action extends ActionsMap<Action>>(
  reducers: { [K in keyof State]: Reducer<State[K], Action> },
  middlewares: Middleware<State, Action>[] = []
) => {
  const rootReducer: Reducer<State, Action> = (state, action) => {
    return (Object.keys(reducers) as Array<keyof State>).reduce(
      (acc, key) => ({ ...acc, [key]: reducers[key](acc[key], action) }),
      state
    );
  };

  return (initialState: State): [State, Dispatch<Action>] => {
    const [state, dispatch] = useReducer(rootReducer, initialState);
    const stateRef = useRef(state);
    stateRef.current = state;

    const store = {
      getState: () => stateRef.current,
      dispatch: (action: Action) => dispatch(action),
    };

    return [state, middlewares.length > 0 ? applyMiddleware<State, Action>(middlewares, store) : dispatch];
  };
};

interface AppState {
  formSteps: IFormStepsState;
  app: IAppState;
}

type AppActions = {
  formSteps: FormStepsAction;
  app: AppAction;
};

type ActionsMap<A> = {
  [K in keyof A]: A[K] extends Record<keyof A[K], (...arg: any[]) => infer R> ? R : any;
}[keyof A];
