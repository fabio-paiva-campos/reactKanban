import React from 'react';
import {SearchIcon, AtSymbolIcon, BellIcon} from '@heroicons/react/outline';

function TopBar(props: any) {
    return (
        <div className="h-16 pl-40 fixed bg-orange-400 w-full flex items-center justify-between pr-5">
            <div className="flex px-5 items-center">
                <SearchIcon className="w-5 h-5 text-white"/>
                <input type="text" placeholder="  Pesquisar..."
                className=" bg-transparent border-0 text-white placeholder-white
                outline-none focus:ring-0 text-lg"/>
            </div>
            <div className="flex space-x-6">
                <AtSymbolIcon className="w-7 h-7 text-white"/>
                <BellIcon className="w-7 h-7 text-white"/>
                <div className="flex items-center text-white">
                    <h3 className="font-bold mr-3">ruan</h3>
                    {/*imagem*/}
                </div>
            </div>
        </div>
    );
}

export default TopBar;