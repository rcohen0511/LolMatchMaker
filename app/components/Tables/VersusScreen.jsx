import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';
import JqGridRun from './VersusScreenRun.js';

class VersusScreen extends React.Component {
    componentDidMount() {
        JqGridRun();
    }
    render() {
        return (
            <ContentWrapper>
                <h3>jqGrid
                   <small>Grid plugin</small>
                </h3>
                { /* JSON */ }
                <div className="jqgrid-responsive mb-lg">
                    <table id="jqGridJSON"></table>
                    <div id="jqGridJSONPager"></div>
                </div>
            </ContentWrapper>
            );
    }

}

export default VersusScreen;
