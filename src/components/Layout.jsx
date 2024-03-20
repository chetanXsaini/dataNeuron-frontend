import { useState, useEffect } from 'react';
import './Layout.css'
import {
    Panel,
    PanelGroup,
    PanelResizeHandle,
} from "react-resizable-panels";
import WindowContainer from './WindowContainer';

const Layout = () => {
    const [windowData, setWindowData] = useState({
        Window1: { number: null, updateCount: null, addCount: null, previousValue: null },
        Window2: { number: null, updateCount: null, addCount: null, previousValue: null },
        Window3: { number: null, updateCount: null, addCount: null, previousValue: null }
    });
    useEffect(() => {
        const fetchData = (identifier) => {
            fetch(`https://dataneuron-91jt.onrender.com/${identifier}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network Error');
                    }
                    return response.json();
                })
                .then(data => {
                    const { number, addCount, updateCount, previousValue } = data;
                    setWindowData(prevState => ({
                        ...prevState,
                        [identifier]: { number, addCount, updateCount, previousValue }
                    }));
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        };

        fetchData("Window1");
        fetchData("Window2");
        fetchData("Window3");
    }, []);



    const handleNumberChange = (identifier, updatedNumber, isAdded) => {
        fetch(`https://dataneuron-91jt.onrender.com/${identifier}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                number: updatedNumber,
                isAdded: isAdded,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setWindowData(prevState => ({
                    ...prevState,
                    [identifier]: {
                        number: updatedNumber,
                        addCount: data.addCount,
                        updateCount: data.updateCount,
                        previousValue: data.previousValue
                    }
                }));
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };


    return (
        <div className="container">
            <PanelGroup direction="vertical">
                <Panel>
                    <PanelGroup direction="horizontal" className='hori'>
                        <Panel defaultSize={50} minSize={10} maxSize={90} >
                            <WindowContainer
                                number={windowData["Window1"].number}
                                name="Window"
                                identifier="Window1"
                                onUpdate={handleNumberChange}
                                updateCount={windowData["Window1"].updateCount}
                                addCount={windowData["Window1"].addCount}
                                previousValue={windowData["Window1"].previousValue}
                            />
                        </Panel>
                        <PanelResizeHandle />
                        <Panel defaultSize={50} minSize={10} maxSize={90}>
                            <WindowContainer
                                number={windowData["Window2"].number}
                                name="Window"
                                identifier="Window2"
                                onUpdate={handleNumberChange}
                                updateCount={windowData["Window2"].updateCount}
                                addCount={windowData["Window2"].addCount}
                                previousValue={windowData["Window2"].previousValue}
                            />
                        </Panel>
                    </PanelGroup>
                </Panel>
                <PanelResizeHandle />
                <Panel defaultSize={50} minSize={10} maxSize={90}>
                    <WindowContainer
                        number={windowData["Window3"].number}
                        name="Window"
                        identifier="Window3"
                        onUpdate={handleNumberChange}
                        updateCount={windowData["Window3"].updateCount}
                        addCount={windowData["Window3"].addCount}
                        previousValue={windowData["Window3"].previousValue}
                    />
                </Panel>
            </PanelGroup>
        </div>
    );
};

export default Layout;
