import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import type {RootState,AppDispatch} from "./store";

//use it instead of useSelector and useDispatch hook to solve error "Property 'login' does not exist on type 'DefaultRootState'";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;