import React from 'react';
import MeterList from './list/MeterList.tsx';
import SearchBar from './houses/SearchBar.tsx';
import Layout from '../components/Layout.tsx';
const History = () => {
    return (
        <>
            <Layout>
                <SearchBar />
                <MeterList />
            </Layout>
        </>
    );
};
export default History;
