import React, { Component, ReactNode } from "react";

interface MyProps {
    message?: string;
    children: ReactNode
};

export default class ErrorBoundary extends Component<MyProps> {
    state = {
        error: false,
    };

    static getDerivedStateFromError(error: any) {
        return {
            error: true,
        };
    }

    //   componentDidCatch(error, info) {
    //     console.log(error);
    //     console.log(info);
    //   }

    render() {
        return (
            <>
                {this.state.error ? <h1>{this.props.message ? this.props.message : "Something went wrong"}</h1> : this.props.children}
            </>
        );
    }
}
