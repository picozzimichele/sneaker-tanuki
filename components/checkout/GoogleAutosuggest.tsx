"use client";
import { ProductContext } from "@/context/ProductContext";
import useClickOutside from "@/hooks/useClickOutside";
import { LoadScriptProps, useLoadScript } from "@react-google-maps/api";
import { useContext, useState, useMemo, useEffect, useRef } from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng, getDetails } from "use-places-autocomplete";

const googleMapsLibraries: LoadScriptProps["libraries"] = ["places"];

export default function GoogleAutosuggest() {
    //LOADING GOOGLE MAPS SCRIPT
    //TODO investigate false performance issue
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries: googleMapsLibraries,
    });
    //CONTEXT
    const { propertyAddress, setPropertyAddress } = useContext(ProductContext);
    const domNode = useClickOutside(() => setSuggestionOpen(false));
    const [suggestionOpen, setSuggestionOpen] = useState(false);
    const {
        init,
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete({ initOnMount: false });

    const handleSelect = async (val: string) => {
        setValue(val, false);
        setSuggestionOpen(false);
        clearSuggestions();

        const results = await getGeocode({ address: val });
        const { lat, lng } = getLatLng(results[0]);
        const parameter = {
            //it passes the place_id to getDetails
            placeId: results[0].place_id,
            //selects only the fields we need
            fields: ["formatted_address", "name", "address_components"],
        };
        const details: any = await getDetails(parameter);
        console.log("details", details);
        const countryArray = details.address_components.map((component: any) => {
            if (component.types[0] === "country") return component.long_name;
        });
        //remove the undefined from the array to get back the country string
        const country = countryArray.filter((country: string) => country !== undefined)[0];

        //usually better
        const addressParts = val.split(", ");
        let city = addressParts[addressParts.length - 2];

        //set the state with the selected country and city
        setPropertyAddress({
            ...propertyAddress,
            streetAddress: val,
            country: country,
            city: city,
            countryLatitude: lat,
            countryLongitude: lng,
        });
    };

    //Wait correctly for the script to load
    useEffect(() => {
        if (isLoaded) {
            init();
        }
    }, [isLoaded, init]);

    return (
        <>
            <div className="flex flex-col h-[60px] rounded-md bg-white p-2 gap-2 relative">
                <p className="text-xs font-medium">Type your address</p>
                <div className="flex justify-between">
                    <input
                        placeholder="search your location"
                        onClick={() => setSuggestionOpen(true)}
                        disabled={!ready || !isLoaded}
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                        }}
                        className="w-full placeholder-gray-400 placeholder:font-light focus-visible:outline-none text-xs text-black bg-white"
                    />
                    <button
                        onClick={() => setValue("")}
                        className={`underline text-black text-xs ${
                            value.length > 0 ? "visible" : "invisible"
                        }`}
                    >
                        Clear
                    </button>
                </div>
                {suggestionOpen && status === "OK" && (
                    <div
                        ref={domNode}
                        className="absolute inset-x-0 top-full border rounded-md z-20 bg-white"
                    >
                        {data?.map(({ place_id, description }) => (
                            <li
                                onClick={() => {
                                    handleSelect(description);
                                }}
                                className="flex px-4 py-2 hover:bg-gray-100 cursor-pointer items-center gap-2"
                                key={place_id}
                            >
                                <p className="text-xs text-black">{description}</p>
                            </li>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
