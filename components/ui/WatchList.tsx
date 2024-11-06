import React from 'react';

interface StockData {
    symbol: string;
    price: number;
}

interface WatchListProps {
    stockDataNew: StockData[];
    selectedTicker: string;
    onTickerChange: (ticker: string) => void;
}

const WatchList: React.FC<WatchListProps> = ({ stockDataNew, selectedTicker, onTickerChange }) => {
    return (
        <div>
            {stockDataNew.map((stock, index) => (
                <div
                    key={index}
                    onClick={() => onTickerChange(stock.symbol)}
                    style={{
                        cursor: 'pointer',
                        padding: '10px',
                        backgroundColor: selectedTicker === stock.symbol ? '#ddd' : '#fff',
                    }}
                >
                    {stock.symbol}: {stock.price}
                </div>
            ))}
        </div>
    );
};

export default WatchList;
