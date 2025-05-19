import React, { useState } from 'react';
import MeterList from './list/MeterList.tsx';
import SearchBar from './houses/SearchBar.tsx';
import Layout from '../components/Layout.tsx';
const History = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    return (
        <>
            <Layout>
                <SearchBar onSearch={setSearchTerm} />
                <MeterList searchTerm={searchTerm} />
            </Layout>
        </>
    );
};
export default History;
