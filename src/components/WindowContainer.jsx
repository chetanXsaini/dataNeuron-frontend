import React, { useState } from 'react';

const WindowContainer = ({ number, identifier, onUpdate, updateCount, addCount, previousValue }) => {
    const [newNumber, setNewNumber] = useState('');
    const [error, setError] = useState(false);

    const handleAdd = () => {
        if (newNumber.trim() === '') {
            setError(true);
            return;
        }
        onUpdate(identifier, newNumber, true);
        setNewNumber('');
        setError(false);
    };

    const handleUpdate = () => {
        if (newNumber.trim() === '') {
            setError(true);
            return;
        }
        onUpdate(identifier, newNumber, false);
        setNewNumber('');
        setError(false);
    };

    return (
        <div className="Window">
            <div className="header">
                <h1>Your Lucky Number: <strong>{number}</strong></h1>
                <h3>Previously: <strong>{previousValue}</strong></h3>
            </div>
            <div className="stats">
                <h2>
                    Luckiness Stats: Added <strong>{addCount} times</strong> | Updated{" "} <strong>{updateCount} times</strong>
                </h2>
            </div>
            <div className="actions">
                <button onClick={handleAdd} style={{marginRight: '10px'}}>Add</button>
                <input
                    type="number"
                    value={newNumber}
                    onChange={(e) => {
                        setNewNumber(e.target.value);
                        setError(false);
                    }}
                    placeholder="Enter a new number"
                    className={error ? 'error' : ''}
                />
                <button onClick={handleUpdate}>Update</button>
            </div>
            {error && <p className="error-text">Please enter a valid number</p>}
            <p className="description">
                Ever heard of lucky numbers? They're fascinating! In number theory, a
                lucky number is a special natural number generated by a unique "sieve"
                algorithm. This method, akin to the Sieve of Eratosthenes for primes,
                sieves out numbers based on their position rather than value. Lucky
                numbers possess intriguing properties resembling primes and even play a
                role in conjectures like Goldbach's. The most exciting part? There are
                infinitely many of them waiting to be discovered!
            </p>
        </div>
    );
};

export default WindowContainer;
