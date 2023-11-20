"use client";
import { ProductContext } from "@/context/ProductContext";
import React, { useContext, useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "@/components/ui/Loader";
import FoxModel from "@/components/models/Fox.jsx";

export default function CongratulationPage() {
    const { selectedProducts, setSelectedProducts } = useContext(ProductContext);

    // we clear the cart here for convinience to have a good user flow
    useEffect(() => {
        selectedProducts?.length > 0 && setSelectedProducts([]);
    }, [selectedProducts?.length, setSelectedProducts]);
    return (
        <div className="flex py-16 flex-col">
            <div className="flex flex-col w-[95%] mx-auto items-center">
                <p className="text-3xl font-bold text-center">
                    Step into Style, Confirming Your Stride with Every Order!
                </p>
                <p className="pt-6 font-light text-sm">
                    Congratulation your order has been shipped!
                </p>
                <p className="font-light text-sm">Order #944502553</p>
                <div className="relative h-full w-full">
                    <Canvas
                        className="w-full h-screen bg-transparent"
                        camera={{
                            near: 0.1,
                            far: 1000,
                        }}
                    >
                        <Suspense fallback={<Loader />}>
                            <directionalLight intensity={0.5} />
                            <ambientLight intensity={0.5} />
                            <pointLight position={[10, 10, 10]} />
                            <spotLight position={[15, 20, 5]} penumbra={1} />
                            <hemisphereLight />
                            <FoxModel />
                        </Suspense>
                    </Canvas>
                </div>
            </div>
        </div>
    );
}
