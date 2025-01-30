import React, { useContext, useEffect, useState } from "react";
import Masonry from "masonry-layout";
import FileSaver from "file-saver";
import imagesLoaded from "imagesloaded";
import InitialLoading from "./InitialLoading";
import ContextApi from "../context/ContextApi";

export default function MasnoryGrid() {
    const { initialLoading, allPosts, search, setSearchResult, searchResult } =
        useContext(ContextApi);
        useEffect(() => {
            const grid = document.querySelector(".masonry-grid");
            new Masonry(grid, {
                itemSelector: ".masonry-item",
                columnWidth: ".masonry-sizer",
                percentPosition: true,
                gutter: 10, // Space between images
            });
        }, [searchResult]); // Reinitialize Masonry when search results change
        
    useEffect(() => {
        const handleSearchResult = allPosts.filter((post) => {
            return (
                post.name.toLowerCase().includes(search.toLowerCase()) ||
                post.prompt.toLowerCase().includes(search.toLowerCase())
            );
        });
        setSearchResult(handleSearchResult);
    }, [search, allPosts, setSearchResult]);

    const saveImage = async (img, index) => {
        await fetch(img)
            .then((response) => response.blob()) // Fetch image and convert it to a Blob
            .then((blob) => {
                const link = document.createElement("a");
                const url = URL.createObjectURL(blob); // Create an object URL for the Blob
                link.href = url;
                link.download = `image_${index}.jpg`; // Set the desired file name
                document.body.appendChild(link);
                link.click(); // Trigger the download
                document.body.removeChild(link); // Clean up
                URL.revokeObjectURL(url); // Clean up the object URL
            })
            .catch((error) => {
                console.error("Error downloading the image:", error);
            });
    };

    return (
        <div className="masonry-grid">
            {initialLoading ? (
                <div className="flex items-center justify-center w-screen mt-25">
                    <InitialLoading />
                </div>
            ) : (
                <>
                    {searchResult.length === 0 ? (
                        <div className="text-2xl text-[#c4c5c5] mt-20 w-screen text-center">Try different Keyword!</div>
                    ) : (
                        <>
                            <div className="masonry-sizer"></div>
                            {searchResult.map((data, index) => (
                                <div
                                    key={index}
                                    className="masonry-item cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 relative"
                                >
                                    <img
                                        src={data.image}
                                        alt={`Masonry ${index}`}
                                        className="w-full h-auto object-cover rounded-lg shadow-lg"
                                    />

                                    <div className="absolute inset-0 flex flex-col items-start gap-[2px] justify-end py-8 px-5 opacity-0 visibility-hidden hover:opacity-100 hover:visibility-visible hover:backdrop-blur-md hover:bg-[rgba(0,0,0,0.6)] transition-all duration-300 ease-in-out">
                                        <div className="flex justify-between w-full items-end">
                                            <div>
                                                <div className="text-white font-[400] text-[15px]">
                                                    {data.prompt}
                                                </div>
                                                <div className="flex gap-[8px] items-center">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            fill="#c4c5c5"
                                                            fill-rule="evenodd"
                                                            d="M12 4a8 8 0 0 0-6.96 11.947A4.99 4.99 0 0 1 9 14h6a4.99 4.99 0 0 1 3.96 1.947A8 8 0 0 0 12 4m7.943 14.076q.188-.245.36-.502A9.96 9.96 0 0 0 22 12c0-5.523-4.477-10-10-10S2 6.477 2 12a9.96 9.96 0 0 0 2.057 6.076l-.005.018l.355.413A9.98 9.98 0 0 0 12 22q.324 0 .644-.02a9.95 9.95 0 0 0 5.031-1.745a10 10 0 0 0 1.918-1.728l.355-.413zM12 6a3 3 0 1 0 0 6a3 3 0 0 0 0-6"
                                                            clip-rule="evenodd"
                                                        />
                                                    </svg>
                                                    <div className="font-[600] text-[15px] flex gap-[8px] text-white items-center">
                                                        {data.name}
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="cursor-pointer"
                                                onClick={() => {
                                                    saveImage(data.image, index);
                                                }}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="30"
                                                    height="30"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        fill="#c4c5c5"
                                                        d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </>
            )}
        </div>
    );
}
