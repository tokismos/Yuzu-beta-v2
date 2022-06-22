import React from 'react';
import {Image} from "react-native";
import FastImage from "react-native-fast-image";

const LazyLoadImage = ({ thumbURL, imgURL, style }) => {
    const defaultImage = Image.resolveAssetSource(require('../assets/default.jpg')).uri;
    return (
        <>
            <FastImage
                style={style}
                source={{
                    uri: defaultImage,
                    priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
            />

            {thumbURL && (
                <FastImage
                    style={style}
                    source={{
                        uri: thumbURL,
                        priority: FastImage.priority.high,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
            )}

            {imgURL && (
                    <FastImage
                        style={style}
                        source={{
                            uri: imgURL,
                            priority: FastImage.priority.high,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    />

            )}
        </>
    )
}

export default LazyLoadImage;