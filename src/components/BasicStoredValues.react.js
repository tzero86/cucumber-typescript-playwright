import React from 'react';
export class BasicStoredValues extends React.Component {

    render() {

        return (
            <>
                <p data-id="first-value" className="storedValue">Testing Talks</p>
                <p data-id="second-value" className="storedValue">Testing Talks</p>
                <p data-id="third-value" className="storedValue">Testing Talks Conference</p>
            </>
        );
    }
};

