import React, { Component, createRef } from 'react';
import CustomCursor from 'utils/customCursor';
import PropTypes from 'prop-types';
import styles from './cursor.module.scss';

class Cursor extends Component {
    cursorRef = createRef();

    outerTriangleRef = createRef();

    innerTriangleRef = createRef();

    cursor = null;

    componentDidMount() {
        this.createCustomCursor();
    }

    createCustomCursor = () => {
        return new CustomCursor(
            this.cursorRef.current,
            this.outerTriangleRef.current,
            this.innerTriangleRef.current
        );
    };

    render() {
        return (
            <div className={styles.cursor} ref={this.cursorRef}>
                <div
                    className={`${styles['cursor-triangle']} ${styles['cursor-outer-triangle']}`}
                    ref={this.outerTriangleRef}
                />
                <div
                    className={`${styles['cursor-triangle']} ${styles['cursor-inner-triangle']}`}
                    ref={this.innerTriangleRef}
                />
            </div>
        );
    }
}

export default Cursor;