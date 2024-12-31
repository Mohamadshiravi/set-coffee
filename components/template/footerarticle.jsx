import Image from "next/image";

export default function FooterArticle() {
  return (
    <div className="flex gap-3 shabnam">
      <Image
        src={"/img/article-photo/cold-berw-coffee.png"}
        width={200}
        height={200}
        className="w-[80px] h-[80px]"
        alt="footer article"
      />
      <div>
        <h2 className="text-white text-sm">
          ارزیابی شیمیایی و حسی قهوه های کلد براساس پروفیل های مختلف برشته کاری
          و روش های دم کردن
        </h2>
        <h3 className="flex text-xs gap-4 text-zinc-300 mt-4">
          <span>09 مرداد 1403</span>
          <span>بدون دیدگاه</span>
        </h3>
      </div>
    </div>
  );
}
