import { FaFacebookMessenger, FaInstagram, FaXTwitter, FaTiktok } from "react-icons/fa6";

export default function SocialShare() {
  const productUrl = typeof window !== "undefined" ? window.location.href : "";
  const text = "Check out this product!";

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title, // You can customize this
          text: text,
          url: productUrl,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      // You can add a tooltip or alert here to inform the user
      alert("Web Share API not supported in this browser. Please copy the link manually.");
      navigator.clipboard.writeText(productUrl);
    }
  };

  return (
    <div className="flex gap-8">
      {/* Facebook Messenger and X (Twitter) remain the same as they support direct URLs */}
      <a
        href={`https://m.me/?link=${encodeURIComponent(productUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaFacebookMessenger className="w-5 h-5 md:h-7 md:w-7 text-[#5D5D5D]" />
      </a>

      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(text)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaXTwitter className="w-5 h-5 md:h-7 md:w-7 text-[#5D5D5D]" />
      </a>

      {/* Instagram and TikTok now use the handleShare function */}
      <button className="cursor-pointer" onClick={handleShare}>
        <FaInstagram className="w-5 h-5 md:h-7 md:w-7 text-[#5D5D5D]" />
      </button>

      <button className="cursor-pointer" onClick={handleShare}>
        <FaTiktok className="w-5 h-5 md:h-7 md:w-7 text-[#5D5D5D]" />
      </button>
    </div>
  );
}