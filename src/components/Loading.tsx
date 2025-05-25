import { FC } from 'react';

interface propsI {
    width?: number;
    height?: number;
    className?: string;
    primary?: boolean;
}

const Loading: FC<propsI> = ({ width = 6, height = 6, className, primary }) => {
    return (
        <svg
            className={`w-${width} h-${height} ${className}`}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            style={{ margin: 'auto', background: 'none', display: 'block', shapeRendering: 'auto' }}
            width="20px"
            height="20px"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid">
            <circle
                cx={50}
                cy={50}
                fill="none"
                stroke={primary ? '#007b5c' : '#ddd'}
                strokeWidth={10}
                r={35}
                strokeDasharray="164.93361431346415 56.97787143782138">
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    repeatCount="indefinite"
                    dur="1s"
                    values="0 50 50;360 50 50"
                    keyTimes="0;1"
                />
            </circle>
        </svg>
    );
};
export default Loading;
