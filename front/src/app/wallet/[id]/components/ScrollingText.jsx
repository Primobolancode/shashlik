export default function ScrollingText({text}) {
    return (
        <div className="scrolling-text-container w-50 whitespace-nowrap overflow-hidden">
            <div className="scrolling-text animate-marquee">{text}</div>
        </div>
    );
}