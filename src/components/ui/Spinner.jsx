function Spinner() {
  return (
    <div>
      <div className="flex gap-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-3 rounded-full bg-[#9dc43b]"
            style={{
              animation: `bar-bounce 1s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`,
              height: "60px",
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes bar-bounce {
          0%,
          100% {
            transform: scaleY(0.3);
            opacity: 0.5;
          }
          50% {
            transform: scaleY(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default Spinner;
