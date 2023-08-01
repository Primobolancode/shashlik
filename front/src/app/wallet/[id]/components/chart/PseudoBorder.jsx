export default function PseudoBorder({className, mTop, bTop, wfull = false, ...rest}) {
    return (
        <div
            className={`${className} ${mTop} ${bTop ? "border-t-2" : "border-l-2"} absolute h-8 border-gray-400 top-0 left-0 right-0`}
            {...rest}
        />

    );
}