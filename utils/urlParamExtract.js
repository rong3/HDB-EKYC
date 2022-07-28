import React from 'react';
import { useLocation } from "react-router-dom";

export const extractParam = (hook, key) => {
    return new URLSearchParams(hook?.search).get(key) ?? null;
}