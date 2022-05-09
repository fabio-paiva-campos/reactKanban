import React from 'react';
import { UserGroupIcon, ServerIcon, CalendarIcon, ChartSquareBarIcon,
CogIcon } from '@heroicons/react/outline';

function SideBar(props: any) {
    return (
        <div className="fixed inset-y-0 left-0 bg-orange-50 w-40">
            <h1 className="flex items-center justify-center text-2xl
            h-16 bg-orange-500 text-white font-bold">B2B Full</h1>

            <ul className="flex flex-col text-lg h-full">
                <li className="flex justify-center items-center flex-col
                py-7 text-gray-500">
                    <UserGroupIcon className="w-7 h-7"/>
                    Página Inicial
                </li>
                <li className="flex justify-center items-center flex-col
                py-7 border-l-4 border-orange-500 text-orange-500
                font-bold">
                    <ServerIcon className="w-7 h-7 text-orange-500"/>
                    Kanbão
                </li>
                <li className="flex justify-center items-center flex-col
                py-7 text-gray-500">
                    <CalendarIcon className="w-7 h-7"/>
                    Agenda
                </li>
                <li className="flex justify-center items-center flex-col
                py-7 text-gray-500">
                    <ChartSquareBarIcon className="w-7 h-7"/>
                    Relatórios
                </li>

                <li className="flex justify-center items-center flex-col
                py-7 text-gray-500 mt-auto mb-16">
                    <CogIcon className="w-7 h-7"/>
                    Configurações
                </li>
            </ul>
        </div>
    );
}

export default SideBar;