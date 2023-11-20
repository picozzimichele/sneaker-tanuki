import React from "react";
import { Html } from "@react-three/drei";

export default function Loader() {
    return (
        <Html>
            <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-[2px] border-blue-500"></div>
            </div>
        </Html>
    );
}
