import React from "react";
import { RecoilRoot } from "recoil";
import { createRoot } from "react-dom/client";
import { Routes } from "generouted/react-router";
import "./index.css";


const container = document.getElementById("root")!;
createRoot(container).render(
  <RecoilRoot>
    <Routes />
  </RecoilRoot>
);
