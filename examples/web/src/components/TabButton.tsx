export const TabButton: React.FC<{
  active: boolean;
  title: string;
  onPress: () => void;
}> = ({ active, title, onPress }) => {
  return (
    <button
      onClick={onPress}
      className={`px-3 py-2 text-white rounded ${active ? "bg-[#F42C04]" : "bg-[#625F63AA]"}`}
    >
      {title}
    </button>
  );
};
