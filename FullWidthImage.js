
import React from "react";
import { View, Image, TouchableOpacity } from 'react-native';
export class FullWidthImage extends React.Component {
    constructor() {
        super();

        this.state = {
            width: 0,
            height: 0
        };
    }
    pedirPermiso = () => {
        this.props.permiso();
    }

    _onLayout(event) {
        const containerWidth = event.nativeEvent.layout.width;

        if (this.props.ratio) {
            this.setState({
                width: containerWidth * this.props.ratio,
                height: containerWidth * this.props.ratio
            });
        } else {
            Image.getSize(this.props.source, (width, height) => {
                this.setState({
                    width: containerWidth,
                    height: containerWidth * height / width
                });
            });
        }
    }

    render() {
        return (
            <View style={this.props.estilo} onLayout={this._onLayout.bind(this)}>
                <TouchableOpacity onPress={this.pedirPermiso}>
                    <Image
                        source={this.props.source}
                        style={{
                            width: this.state.width,
                            height: this.state.height
                        }} />
                </TouchableOpacity>
            </View>
        );
    }
}