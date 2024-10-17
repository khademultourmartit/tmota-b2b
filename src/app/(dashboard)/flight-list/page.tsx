import React, { useEffect, useState } from "react";
import OnewaySearch from "./_components/OneWaySearch";
import RoundwaySearch from "./_components/RoundWaySearch";
import { projectConfig } from "@/config";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";

const page = () => {
  return (
    <div>
      <OnewaySearch />
    </div>
  );
};

export default page;
