import React from 'react';

const Footer = ({ setAppMode }) => (
    <footer className="footer p-0 pb-3">
        <div className="row align-items-center">
            <div className="col-auto m-auto p-0 text-center">
                <p className={'mb-0 text-center d-inline-block clickable link sources'}
                   onClick={() => setAppMode('sources')}>Sources</p>
                <p className={'mb-0'}>Made with love and concern by <strong><a target="_blank"
                                                                               rel="noopener noreferrer"
                                                                               href="https://github.com/alexandre-mace">@alexandre-mace</a></strong>
                </p>
            </div>
        </div>
    </footer>
)
export default Footer;