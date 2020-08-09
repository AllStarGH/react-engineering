import React, { Component } from "react";

/**
 * { function_description }
 *
 * @param      {Function}  importComponent  The import component
 * @return     {<type>}    { description_of_the_return_value }
 */
export default function asyncComponent(importComponent) {
    class AsyncComponent extends Component {
        constructor(props) {
            super(props);

            this.state = {
                component: null
            }
        }

        async componentDidMount() {
            const { default: component } = await importComponent();

            this.setState({ component });
        }

        render() {
            const C = this.state.component;

            return C ? <C {...this.props} /> : null;
        }
    }

    return AsyncComponent;
}