"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { DressModal } from "@/components/DressModal";
import { MagneticButton } from "./MagneticButton";
import defaultOfferingsConfig from '@/lib/default_config.json';

const collection = [
  {
    "title": "Fuchsia Majesty",
    "category": "Dresses",
    "price": "$7,955",
    "depositAmount": "$2,000",
    "depositLink": "https://buy.stripe.com/3cI14nd5q0301L3fH6b3q00",
    "description": "A bespoke silk evening gown of unapologetic glamour, featuring a dramatic high slit and exquisite Swarovski crystal embroidery along the thigh. This handcrafted couture dress commands every entrance with the confidence of luxury fashion at its most fearless.",
    "fabric": "Lustrous silk in vivid fuchsia, sculpted to the body with a daring slit and adorned with hand-applied Swarovski crystal embroidery cascading along the thigh, each stone individually set by our atelier's master beaders.",
    "customization": "Custom-tailored to your exact silhouette with bespoke slit lengths and corsetry adjustments. Available in an exclusive palette of jewel tones, from deep amethyst to midnight ruby.",
    "img": "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2Ff5720508-8148-4bd3-ab0f-2b8612f15cda?alt=media&token=7be40366-58e3-4eb1-91c8-f24d29299550",
    "detailImages": [
      "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2Ff5720508-8148-4bd3-ab0f-2b8612f15cda?alt=media&token=7be40366-58e3-4eb1-91c8-f24d29299550",
      "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2F4504c389-c3d2-46e1-8d74-b11a2f302c9d?alt=media&token=8e7651a6-f018-423a-af14-8732c17beba4",
      "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2F7d975395-bf40-4d57-8af5-6bcb59f284fc?alt=media&token=581decdc-8589-42f1-96af-607787375594",
      "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2F07b644bc-5481-47b5-90d9-f43b3f22ba8f?alt=media&token=7f16e428-9cb2-4b31-b6a7-97c981458238",
      "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2Ff4cc8934-b7a2-4a0d-b56f-daf7af727f53?alt=media&token=22543f6c-6f85-4c07-a0b0-e704177153e1"
    ],
    "aspectClass": "aspect-[3/4]",
    "processImg": "/images/process/beading.jpg"
  },
  {
    "title": "Blush Enchantress",
    "category": "Dresses",
    "price": "$8,700",
    "depositAmount": "$2,200",
    "depositLink": "https://buy.stripe.com/5kQdR9e9uaHE1L37aAb3q04",
    "description": "An ethereal haute couture gown of timeless romance, featuring an intricately hand-appliquéd French lace bodice and elegant long sleeves. Perfect as a custom wedding dress or a majestic evening gown, this creation defines bridal elegance.",
    "fabric": "Ethereal ivory silk tulle paired with hand-cut French Chantilly and Guipure lace, fully lined with luxurious sandwashed silk charmeuse and draping into a delicate sweep train.",
    "customization": "Neckline height, sleeve coverage, and train length are fully tailored to your silhouette. Available in classic ivory, warm cream, alabaster, or custom-dyed bridal shades.",
    "img": "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2F2f7c3f0f-2025-4098-86e5-76e1b21fe5e4?alt=media&token=b174088f-754a-49ef-8d45-ffe114715f60",
    "detailImages": [
      "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2F2f7c3f0f-2025-4098-86e5-76e1b21fe5e4?alt=media&token=b174088f-754a-49ef-8d45-ffe114715f60",
      "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2Fbodice-82fdd8d6.jpg?alt=media&token=f7194a14-dafe-4377-92be-d26163974a57",
      "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2Fdetails-ff7e9548.jpg?alt=media&token=26a32d77-467d-42c6-a01c-0c0f536a7cc6",
      "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2Fhem-ab26a2cd.jpg?alt=media&token=096112cf-997d-43d0-a1ec-0dbad2b1ba12",
      "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2Fback-view-aac32be5.jpg?alt=media&token=1917852d-d930-4a13-b86d-6f2431983f8c"
    ],
    "aspectClass": "aspect-[2/3]",
    "processImg": "/images/process/draping.jpg"
  },
  {
    "title": "Golden Whisper",
    "category": "Dresses",
    "price": "$9,200",
    "depositAmount": "$2,300",
    "depositLink": "https://buy.stripe.com/cNi00jaXi3fc0GZ9iIb3q01",
    "description": "A luminous gala gown of champagne mesh drenched in hand-set Swarovski crystals, alive with every shift of light. This bespoke evening gown is richly embroidered and luxuriously heavy, with a captivating transparency that is radiant and utterly unforgettable on the red carpet.",
    "fabric": "Transparent mesh meticulously encrusted with gold-leaf threading and thousands of Swarovski champagne crystals, the dense embroidery lending a substantial, luxurious weight that drapes beautifully against the body.",
    "customization": "Train length, crystal density, and silhouette are entirely bespoke. Internal corsetry is precision-engineered for unparalleled structural support tailored to your body.",
    "img": "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2Fa233bbdb-25ac-47fe-b686-71493e2cc226?alt=media&token=447745e0-6fd4-4fe0-b328-63b25f3199e0",
    "detailImages": [
      "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2Fa233bbdb-25ac-47fe-b686-71493e2cc226?alt=media&token=447745e0-6fd4-4fe0-b328-63b25f3199e0",
      "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2Fb033a925-d5ff-46d1-ad2b-a269d7c2bf5f?alt=media&token=a49ae0be-bbcd-4988-8347-7d48424fedae",
      "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2F55e57967-dadc-4b3e-928e-5c6cf17fbc5b?alt=media&token=78574476-794c-4dee-9242-b902418b1dcb",
      "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2F0a8786cd-994b-40c2-bee5-693bdef9a372?alt=media&token=7f9b66dd-e32d-4284-abe3-70ddd501c45a",
      "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2Fb301511d-73b5-4f1d-ad99-9ae0f0f1cbb0?alt=media&token=d73c8be2-ec6d-450c-80d4-d377d871bc65"
    ],
    "aspectClass": "aspect-[3/4]",
    "processImg": "/images/process/crystals.jpg"
  },
  {
    "title": "Crimson Allure",
    "category": "Dresses",
    "price": "$7,980",
    "depositAmount": "$2,000",
    "depositLink": "https://buy.stripe.com/eVq3cv0iE7vs89rdyYb3q02",
    "description": "Confidence, cut in silk couture. This sleek red carpet gown pairs sumptuous silk crepe with shimmering side panels for unapologetic drama. A designer dress born for galas, premieres, and every moment that demands luxury fashion with edge.",
    "fabric": "Heavy-weight double-faced silk crepe de chine that cascades like liquid fire, featuring hand-embroidered ruby micro-sequin side panelling with gradient intensity.",
    "customization": "Neckline plunge depth and sequin gradient density are flawlessly tailored to your preference. Hardware finishes available in gold or platinum finish, with optional monogrammed interior.",
    "img": "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2F04669707-071a-432c-82e4-76b144da07e4?alt=media&token=87ed9797-099d-4c08-ad4e-bcac6cc65c4b",
    "detailImages": [
      "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2F04669707-071a-432c-82e4-76b144da07e4?alt=media&token=87ed9797-099d-4c08-ad4e-bcac6cc65c4b",
      "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2F80ea31c0-48f6-4c43-80d3-c606f0b02098?alt=media&token=96ad56d8-3457-47ee-a9e8-d3379f5f13e3",
      "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2F2165d976-a9b6-40a1-889b-5ead76256b91?alt=media&token=f492a18a-a513-4c8e-9b2f-4015113869ef",
      "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2F22b8cf61-7de1-41cc-8d59-fd926522d69f?alt=media&token=7a1b21ab-2ab2-447c-8975-cb6cc7d0d2b1",
      "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2F7400f28a-a028-44c2-bfbe-f2cebf2ac99f?alt=media&token=beba126f-6df6-4bde-b4f3-23c326568472"
    ],
    "aspectClass": "aspect-[4/5]",
    "processImg": "/images/process/sewing.jpg"
  },
  {
    "title": "Blush Couture",
    "category": "Dresses",
    "price": "$11,700",
    "depositAmount": "$3,000",
    "depositLink": "https://buy.stripe.com/14AaEXaXig1YgFX8eEb3q03",
    "description": "The ultimate expression of our atelier's bespoke couture craft: layers of hand-dyed rosewater silk organza and delicate petal appliqués converge in a breathtaking statement piece. This haute couture creation elevates modern femininity into wearable art.",
    "fabric": "Hand-dyed rosewater silk organza floating weightlessly over cascading French Chantilly lace, adorned with 3D silk-chiffon floral appliqués, each petal individually shaped and stitched by hand.",
    "customization": "Skirt volume is completely adjustable via a detachable crinoline system, with petal density and train length tailored to your preference. Available in rosewater blush, ivory, champagne, or custom-dyed shades.",
    "img": "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2F4f8b61de-f7ce-4eab-8056-b80769b17b73?alt=media&token=79857bc2-e2ed-4e7f-9a3a-47cd52717ef9",
    "detailImages": [
      "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2F4f8b61de-f7ce-4eab-8056-b80769b17b73?alt=media&token=79857bc2-e2ed-4e7f-9a3a-47cd52717ef9",
      "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2Fe246f5dc-62ca-4efa-9165-9d153e8d8c40?alt=media&token=40c2b7bb-6308-4f89-99fd-1bb38de7e61a",
      "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2Fd3b06dd7-26e7-45e0-ab77-9d896c730ead?alt=media&token=a76fba4e-7f03-4a4d-b749-05bb4568d03e",
      "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2F2fc9991c-01c9-41c3-abf8-12dbf52d9c00?alt=media&token=0664c3de-b030-4c32-834f-04f8844d51b9",
      "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2Fa458396a-8d0f-42bd-96b9-d87af9fc9bcc?alt=media&token=3ca9fac8-c2ef-4bb9-9224-74b4545ea015"
    ],
    "aspectClass": "aspect-[2/3]",
    "processImg": "/images/process/applique.jpg"
  },
  {
    "title": "Pearl Symphony",
    "category": "Accessories",
    "price": "$4,200",
    "depositAmount": "$1,000",
    "depositLink": "",
    "description": "A symphony of hand-strung freshwater pearls and brilliant diamond accents, this bespoke accessories masterpiece embodies the quiet grandeur of haute couture jewelry. Exquisite as a bridal accent, mother of the bride treasure, or red carpet finishing touch.",
    "fabric": "18k white gold filigree meticulously interwoven with lustrous South Sea pearls of exceptional nacre quality, accented by VS-clarity diamond pavé set by our master jeweler over sixty painstaking hours.",
    "customization": "Available in rose gold, yellow gold, and platinum finishes. Pearl size graduation, strand length, and diamond accent placement are tailored to your personal aesthetic through private fitting.",
    "img": "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&q=80",
    "detailImages": [
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg"
    ],
    "aspectClass": "aspect-[3/4]",
    "processImg": "/images/process/luneville.jpg"
  },
  {
    "title": "Obsidian Clutch",
    "category": "Accessories",
    "price": "$5,500",
    "depositAmount": "$1,500",
    "depositLink": "",
    "description": "A structured evening clutch crafted from the world's rarest materials, the essential bespoke accessories companion for any red carpet gown or gala gown moment. This luxury fashion statement piece transforms the art of arrival into a ritual of quiet power.",
    "fabric": "Hand-selected matte Niloticus crocodile leather in deep obsidian, paired with mirror-polished platinum hardware and an interior of hand-dyed midnight silk charmeuse.",
    "customization": "Monogramming available on the interior silk lining in gold or platinum thread. Exotic leather colorways, hardware finishes, and clasp gemstone inlays are available through our bespoke program.",
    "img": "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80",
    "detailImages": [
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg"
    ],
    "aspectClass": "aspect-[4/5]",
    "processImg": "/images/process/buttons.jpg"
  },
  {
    "title": "Crystal Steps",
    "category": "Accessories",
    "price": "$2,800",
    "depositAmount": "$700",
    "depositLink": "",
    "description": "The glass slipper reimagined for the modern muse: a dazzling fusion of transparency and sparkle that elevates any bespoke evening gown or custom wedding dress. These bespoke accessories are luxury fashion's answer to Cinderella, designed for real-world red carpets.",
    "fabric": "Optically pure Italian Lucite heel sculpted to architectural precision, paired with straps encrusted in over three hundred individually hand-set Swarovski crystals with aurora borealis finish.",
    "customization": "Heel height adjustable between 85mm and 110mm. Strap crystal colorway, sole personalization, and custom sizing ensure a perfect bespoke fit for your most important evening.",
    "img": "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=800&q=80",
    "detailImages": [
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg"
    ],
    "aspectClass": "aspect-[3/4]",
    "processImg": "/images/process/handstitch.jpg"
  },
  {
    "title": "Golden Hour",
    "category": "Accessories",
    "price": "$3,100",
    "depositAmount": "$800",
    "depositLink": "",
    "description": "A breathtaking bespoke accessories statement piece that catches and refracts every ray of light into prismatic splendor. Worn alone or layered with haute couture, this handcrafted treasure defines luxury fashion's golden hour: luminous, warm, and impossibly radiant.",
    "fabric": "Solid brass foundation with 24k gold plating applied in three meticulous layers for enduring luster, adorned with hand-set smoked topaz crystals sourced from master gem cutters in Idar-Oberstein.",
    "customization": "Available in sterling silver, 24k gold, and rose gold vermeil finishes. Crystal colorway, chain length, and clasp style are fully customizable through our bespoke accessories atelier.",
    "img": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    "detailImages": [
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg"
    ],
    "aspectClass": "aspect-[2/3]",
    "processImg": "/images/process/ribbon.jpg"
  },
  {
    "title": "Velvet Veil",
    "category": "Accessories",
    "price": "$1,500",
    "depositAmount": "$400",
    "depositLink": "",
    "description": "A dramatic finishing touch that transforms any haute couture ensemble into a moment of cinematic mystery. This handcrafted veil is among our most coveted bespoke accessories, equally stunning for a custom wedding dress as for a red carpet gown editorial.",
    "fabric": "Sumptuous silk velvet band in deep noir, paired with hand-woven French illusion netting featuring delicate picot edging and scattered micro-crystal accents that catch the light like captured stars.",
    "customization": "Hand-embroidered motifs, from celestial constellations to monogram initials, can adorn the netting. Veil length, velvet band width, and crystal density are tailored to your vision.",
    "img": "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    "detailImages": [
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg"
    ],
    "aspectClass": "aspect-[4/5]",
    "processImg": "/images/process/dyeing.jpg"
  },
  {
    "title": "Midnight Elegance",
    "category": "Dresses",
    "price": "$8,850",
    "depositAmount": "$2,200",
    "depositLink": "https://buy.stripe.com/3cI14n9Te4jg75namMb3q05",
    "description": "Where darkness whispers luxury fashion. This bespoke evening gown in deep navy velvet is sculpted to perfection, draping with quiet power that commands any red carpet event. A haute couture masterpiece for those who rule the room through understated elegance.",
    "fabric": "Midnight blue silk-viscose pané velvet, extraordinarily soft and plush with a hand-brushed pile that catches the light like a starlit winter sky, fully lined in heavy silk charmeuse.",
    "customization": "Backless plunge depth, sleeve length, and shoulder silhouette are bespoke. Interior lining available in contrasting jewel tones: emerald, ruby, or sapphire silk charmeuse.",
    "img": "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2Ff4c8fe02-afaa-458f-b217-bc5a3a57ea00?alt=media&token=697ddc89-dcdd-432d-9e94-a4c759b5027e",
    "detailImages": [
      "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2Ff4c8fe02-afaa-458f-b217-bc5a3a57ea00?alt=media&token=697ddc89-dcdd-432d-9e94-a4c759b5027e",
      "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2Fdad8d1ef-cacc-410a-bd80-5730beeb582c?alt=media&token=a0cec60d-7425-4271-9500-789ce68eb132",
      "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2Fb64d52c5-6bb5-4a6f-94c9-d0de05eafa05?alt=media&token=81aa9355-8ba1-49df-a25c-de3349e73549",
      "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2F0ea0b5a2-5387-4acf-8573-4cd7c6b28ee2?alt=media&token=af1f50de-7182-44d2-ae18-08e4cc6966c1",
      "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2F1f9c9176-4e00-4688-9d0f-7b39ed300abf?alt=media&token=6630f3ff-ac28-42ce-97bd-aa74f638a0e8"
    ],
    "aspectClass": "aspect-[3/4]",
    "processImg": "/images/process/cutting.jpg"
  },
  {
    "title": "Noir Power",
    "category": "Jackets",
    "price": "$7,200",
    "depositAmount": "$1,800",
    "depositLink": "",
    "description": "A commanding couture jacket with exaggerated lapels that redefine power dressing for the modern era. This designer dress alternative bridges the worlds of haute couture tailoring and luxury fashion's boldest silhouettes: fierce, sculpted, and undeniably authoritative.",
    "fabric": "Heavy Italian virgin wool crepe in deep noir, contrasted with lustrous silk duchesse satin peaked lapels and a hand-finished interior of silk twill with branded jacquard weave.",
    "customization": "Shoulder pad architecture, button materials (mother-of-pearl, horn, or gold), lapel width, and overall silhouette are fully bespoke. Sleeve lining monogramming included.",
    "img": "/collections/jacket_two.png",
    "detailImages": [
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg"
    ],
    "aspectClass": "aspect-[2/3]",
    "processImg": "/images/process/corset.jpg"
  },
  {
    "title": "Ivory Architecture",
    "category": "Jackets",
    "price": "$9,100",
    "depositAmount": "$2,300",
    "depositLink": "",
    "description": "A structured double-breasted couture jacket that redefines shape with architectural precision and haute couture craftsmanship. This ivory masterpiece is luxury fashion's answer to modern sculpture, equally at home over a bespoke evening gown or commanding the street as a standalone designer dress.",
    "fabric": "Exquisite cashmere-wool blend woven by heritage mills in the Scottish Borders, brushed to a cloud-soft hand with natural ivory depth that deepens with each wear.",
    "customization": "Interior lining features bespoke hand-painted silk motifs commissioned from our in-house artist. Button finish, belt closure, and shoulder line are tailored through private fitting.",
    "img": "https://images.unsplash.com/photo-1550639525-c97d455acf70?w=800&q=80",
    "detailImages": [
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg"
    ],
    "aspectClass": "aspect-[3/4]",
    "processImg": "/images/process/measuring.jpg"
  },
  {
    "title": "Crimson Drape",
    "category": "Jackets",
    "price": "$6,500",
    "depositAmount": "$1,600",
    "depositLink": "",
    "description": "A fluid couture jacket reimagined as a crimson trench that moves like liquid silk; drama distilled into luxury fashion's most wearable silhouette. Layer over a cocktail dress or bespoke evening gown for an entrance that lingers in memory long after you've arrived.",
    "fabric": "Italian water-resistant silk gabardine in deep crimson, with a matte finish that captures movement like poured wine. Fully lined in contrasting silk twill with storm flap detailing.",
    "customization": "Belt thickness, buckle material (brushed gold, silver, or horn), collar height, and hem length are all bespoke. Available in twelve exclusive colorways through private consultation.",
    "img": "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
    "detailImages": [
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg"
    ],
    "aspectClass": "aspect-[4/5]",
    "processImg": "/images/process/steaming.jpg"
  },
  {
    "title": "Onyx Edge",
    "category": "Jackets",
    "price": "$8,200",
    "depositAmount": "$2,000",
    "depositLink": "",
    "description": "A sharp, minimalist couture jacket with a dramatic stand collar that cuts through convention with razor precision. This designer dress-level outerwear piece is luxury fashion distilled to its purest form, where every seam speaks of haute couture discipline and artistry.",
    "fabric": "Heavy Italian wool melton in deep onyx with a dense, sculptural hand, contrasted by silk duchesse satin collar facings and interior panel detailing for hidden opulence.",
    "customization": "Hidden interior pockets, silk lining monogramming in metallic thread, collar height, and button concealment are fully bespoke. Dramatic back vent and sleeve length tailored to your frame.",
    "img": "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=80",
    "detailImages": [
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg"
    ],
    "aspectClass": "aspect-[3/4]",
    "processImg": "/images/process/painting.jpg"
  },
  {
    "title": "Tweed Illusion",
    "category": "Jackets",
    "price": "$7,800",
    "depositAmount": "$2,000",
    "depositLink": "",
    "description": "A modern couture jacket that reimagines the classic tailored tweed with hand-woven textures and unexpected metallic luminosity. This designer dress companion bridges heritage craft and avant-garde luxury fashion, the kind of haute couture piece that starts conversations and ends debates.",
    "fabric": "Hand-woven French bouclé with interlaced metallic gold and silver threads, creating a subtly shimmering surface that shifts between matte and lustrous depending on the light.",
    "customization": "Trim details, from silk ribbon edging to hand-braided cord, and button choices (vintage crystal, enameled gold, or hand-carved mother-of-pearl) are fully bespoke through our atelier.",
    "img": "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    "detailImages": [
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg"
    ],
    "aspectClass": "aspect-[2/3]",
    "processImg": "/images/process/swatches.jpg"
  },
  {
    "title": "Ivory Cascade",
    "category": "Blouses",
    "price": "$3,400",
    "depositAmount": "$850",
    "depositLink": "",
    "description": "A masterclass in modern draping and silk couture: this luxury blouse pairs pure silk crepe de chine with dramatic sweeping ties for effortless editorial elegance. A versatile designer dress companion that transitions from boardroom power to evening allure with a single adjustment.",
    "fabric": "100% heavy silk crepe de chine sourced from heritage weavers in Como, Italy. Finished with luminous mother-of-pearl button closures and French-seamed construction throughout.",
    "customization": "Tie length, sleeve volume, and collar structure can be adjusted to your preference. Available in Ivory, Obsidian, Blush, and seasonal exclusive colorways.",
    "img": "https://storage.googleapis.com/mixo-sites/images/file-77426bbf-6aac-41f4-8c9f-16b8a9375343.PNG",
    "detailImages": [
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg"
    ],
    "aspectClass": "aspect-[3/4]",
    "processImg": "/images/process/sketching.jpg"
  },
  {
    "title": "Chiffon Whisper",
    "category": "Blouses",
    "price": "$2,900",
    "depositAmount": "$700",
    "depositLink": "",
    "description": "A sheer luxury blouse of French silk chiffon with intricate hand-pleating that whispers against the skin like a secret. This hand-embroidered piece of silk couture is the perfect layering companion for any bespoke evening gown, cocktail dress, or couture jacket moment.",
    "fabric": "Gossamer French silk chiffon from Lyon with hand-rolled edges, trimmed in heirloom Chantilly lace with scalloped detailing. Each pleat is individually pressed and set by hand.",
    "customization": "Cuff closures available in freshwater pearl or pavé diamond. Pleat density, sleeve length, and chiffon opacity can be adjusted through bespoke fitting consultation.",
    "img": "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=800&q=80",
    "detailImages": [
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg"
    ],
    "aspectClass": "aspect-[2/3]",
    "processImg": "/images/process/pleating.jpg"
  },
  {
    "title": "Satin Armor",
    "category": "Blouses",
    "price": "$3,800",
    "depositAmount": "$950",
    "depositLink": "",
    "description": "A high-neck luxury blouse that marries silk couture softness with the architectural authority of strong, sculpted shoulders. This designer dress-level silk piece is as commanding beneath a couture jacket as it is striking worn alone. Haute couture power, reimagined for modern women.",
    "fabric": "100-momme Italian silk satin with an extraordinary weight and luminous drape, featuring precision-cut bias panels and concealed internal shoulder architecture for sculptural definition.",
    "customization": "Collar height, tie length, shoulder structure, and cuff detailing are fully bespoke. Available in twelve curated silk colorways, each dyed exclusively for our atelier.",
    "img": "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=800&q=80",
    "detailImages": [
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg"
    ],
    "aspectClass": "aspect-[3/4]",
    "processImg": "/images/process/pinning.jpg"
  },
  {
    "title": "Organza Cloud",
    "category": "Blouses",
    "price": "$4,100",
    "depositAmount": "$1,000",
    "depositLink": "",
    "description": "Voluminous sleeves that float around the arms like sculpted clouds; this luxury blouse transforms silk organza into wearable poetry. A hand-embroidered silk couture statement that pairs effortlessly with a cocktail dress skirt or adds ethereal drama beneath a couture jacket.",
    "fabric": "Hand-dyed silk organza from heritage ateliers in Lyon, treated with a specialized finish that holds its voluminous shape while remaining featherlight. Each sleeve uses over two meters of fabric.",
    "customization": "Sleeve volume, gathered cuff elasticity, and body fit are individually tailored. Available in custom-dyed colorways from whisper pastels to saturated jewel tones.",
    "img": "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&q=80",
    "detailImages": [
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg"
    ],
    "aspectClass": "aspect-[4/5]",
    "processImg": "/images/process/pressing.jpg"
  },
  {
    "title": "Silk Essential",
    "category": "Blouses",
    "price": "$2,200",
    "depositAmount": "$550",
    "depositLink": "",
    "description": "The perfect minimalist luxury blouse: pure silk couture reduced to its most essential, elegant form. This sandwashed silk charmeuse shirt is the foundation of any haute couture wardrobe, effortlessly pairing with everything from a bespoke evening gown skirt to tailored trousers.",
    "fabric": "Sandwashed silk charmeuse with a buttery, lived-in softness achieved through a specialized enzyme wash process. The natural luster creates depth that synthetic fabrics cannot replicate.",
    "customization": "Available in twelve exclusive custom-dye colorways developed by our in-house colorist. Collar shape, cuff style, and body length are tailored through bespoke fitting.",
    "img": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
    "detailImages": [
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg"
    ],
    "aspectClass": "aspect-[3/4]",
    "processImg": "/images/process/ironing.jpg"
  },
  {
    "title": "Lace Romance",
    "category": "Blouses",
    "price": "$4,500",
    "depositAmount": "$1,100",
    "depositLink": "",
    "description": "An intricate hand-embroidered luxury blouse where French Chantilly lace cascades over silk organza in a demure yet captivating silhouette. This silk couture piece is a mother of the bride favorite and a timeless addition to any haute couture collection. Romance rendered in thread and light.",
    "fabric": "Heirloom-quality French Chantilly lace with floral and foliate motifs, delicately layered over whisper-weight silk organza. Each lace panel is hand-matched for seamless pattern continuity.",
    "customization": "Lace pattern variations, from botanical to geometric, are available upon request. Organza underlayer color, sleeve length, and neckline shape are fully bespoke through atelier consultation.",
    "img": "https://images.unsplash.com/photo-1574291814206-363acdf2aa79?w=800&q=80",
    "detailImages": [
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg",
      "/details/placeholder_coming_soon.svg"
    ],
    "aspectClass": "aspect-[2/3]",
    "processImg": "/images/process/embroidery.jpg"
  }
];

export type DressItem = typeof collection[0];

function DressCard({ 
  item, 
  onClick,
  isPlaceholder = false,
  isActiveCategory = false,
  altText,
  priority = false,
  thumbnailUrl
}: { 
  item: DressItem, 
  onClick: () => void,
  isPlaceholder?: boolean,
  isActiveCategory?: boolean,
  altText?: string,
  priority?: boolean,
  thumbnailUrl?: string
}) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, margin: "0px 0px -75% 0px" });
  
  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`relative overflow-hidden cursor-pointer group w-full ${item.aspectClass} ${isActiveCategory ? 'ring-1 ring-[var(--dada-red)] opacity-90' : ''}`}
      onClick={onClick}
    >
      <div className="w-full h-full relative">
        {/* Process Photo - shown by default, fades on hover/scroll */}
        {item.processImg && (
          <img 
            src={item.processImg} 
            alt={`Art Couture ${item.title} bespoke couture craftsmanship`} 
            loading={priority ? "eager" : "lazy"}
            className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ease-out group-hover:opacity-0 z-[1] ${isInView ? 'opacity-0' : 'opacity-100'}`}
            style={{ filter: 'grayscale(100%) sepia(40%) hue-rotate(330deg) brightness(0.75) contrast(0.85)' }}
            {...({ fetchPriority: priority ? "high" : undefined } as any)}
          />
        )}

        {/* The Product Image - revealed on hover/scroll */}
        <motion.img 
          src={thumbnailUrl || item.img} 
          alt={altText || `${item.title} – Art Couture bespoke haute couture`}
          loading={priority ? "eager" : "lazy"}
          className={`w-full h-full object-cover absolute inset-0 transition-all duration-[2s] ${isActiveCategory ? '' : 'group-hover:scale-110'} ${isInView ? 'scale-105' : ''}`}
          {...({ fetchPriority: priority ? "high" : undefined } as any)}
        />
        
        {/* Grainy Film Overlay that fades out on hover/scroll */}
        {!isActiveCategory && (
          <div 
            className={`absolute inset-0 group-hover:opacity-0 transition-opacity duration-1000 mix-blend-overlay pointer-events-none z-[2] ${isInView ? 'opacity-0' : 'opacity-[0.55]'}`}
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
          />
        )}

        {/* Subtle persistent overlay for title readability */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 ${isActiveCategory ? 'opacity-100' : 'group-hover:opacity-100'} transition-opacity duration-500`} />
        
        {/* Elegant Partial Frame (Corner Brackets) - or Full Frame if Active */}
        {isActiveCategory ? (
          <div className="absolute inset-4 md:inset-6 border-[0.5px] border-[var(--dada-red)] z-10 pointer-events-none" />
        ) : (
          <>
            <div className="absolute top-4 left-4 md:top-6 md:left-6 w-12 h-12 md:w-16 md:h-16 border-t-[0.5px] border-l-[0.5px] border-[var(--dada-red)]/70 z-10 pointer-events-none transition-all duration-700 group-hover:w-16 group-hover:h-16 md:group-hover:w-20 md:group-hover:h-20 group-hover:border-[var(--dada-red)] group-hover:-translate-x-1 group-hover:-translate-y-1" />
            <div className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 md:w-16 md:h-16 border-t-[0.5px] border-r-[0.5px] border-[var(--dada-red)]/70 z-10 pointer-events-none transition-all duration-700 group-hover:w-16 group-hover:h-16 md:group-hover:w-20 md:group-hover:h-20 group-hover:border-[var(--dada-red)] group-hover:translate-x-1 group-hover:-translate-y-1" />
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 w-12 h-12 md:w-16 md:h-16 border-b-[0.5px] border-l-[0.5px] border-[var(--dada-red)]/70 z-10 pointer-events-none transition-all duration-700 group-hover:w-16 group-hover:h-16 md:group-hover:w-20 md:group-hover:h-20 group-hover:border-[var(--dada-red)] group-hover:-translate-x-1 group-hover:translate-y-1" />
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-12 h-12 md:w-16 md:h-16 border-b-[0.5px] border-r-[0.5px] border-[var(--dada-red)]/70 z-10 pointer-events-none transition-all duration-700 group-hover:w-16 group-hover:h-16 md:group-hover:w-20 md:group-hover:h-20 group-hover:border-[var(--dada-red)] group-hover:translate-x-1 group-hover:translate-y-1" />
          </>
        )}

        {/* Zoom/Click indicator icon */}
        {!isPlaceholder && (
          <div className="absolute top-5 right-5 md:top-7 md:right-7 z-20 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="21" y2="21" />
            </svg>
          </div>
        )}

        <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 z-20">
          <h3 className={`${isPlaceholder ? 'text-lg md:text-xl lg:text-2xl font-light tracking-[0.15em]' : 'text-3xl md:text-4xl tracking-wide font-light'} font-serif ${isActiveCategory ? 'text-[var(--dada-red)]' : 'text-white'} drop-shadow-lg transform ${isActiveCategory ? '' : 'group-hover:-translate-y-2'} transition-transform duration-500`}>
            {item.title}
          </h3>
          {!isPlaceholder && (
            <p className="font-mono text-xs text-white/70 uppercase tracking-widest mt-3 flex items-center gap-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
              <span>Discover</span>
              <span className="w-6 h-[1px] bg-white/70 inline-block"></span>
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function ServiceCard({ service, onEnquire }: { service: { title: string, description: string, img: string }, onEnquire: () => void }) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.5 });
  const [tapped, setTapped] = React.useState(false);

  const handleClick = React.useCallback(() => {
    if (window.matchMedia("(pointer: coarse)").matches && !tapped) {
      setTapped(true);
      return;
    }
    onEnquire();
  }, [tapped, onEnquire]);

  React.useEffect(() => {
    if (!tapped) return;
    const handleOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setTapped(false);
      }
    };
    document.addEventListener("click", handleOutside);
    return () => document.removeEventListener("click", handleOutside);
  }, [tapped]);

  const showDesc = tapped || isInView;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8 }}
      className="group relative overflow-hidden cursor-pointer aspect-[3/4]"
      onClick={handleClick}
    >
      <img 
        src={service.img} 
        alt={`Art Couture ${service.title} – bespoke atelier service`}
        loading="lazy"
        className="w-full h-full object-cover absolute inset-0 transition-all duration-1000 group-hover:scale-110"
        style={{ filter: 'grayscale(100%) sepia(40%) hue-rotate(330deg) brightness(0.55) contrast(0.85)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
      
      {/* Corner brackets */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 w-10 h-10 md:w-12 md:h-12 border-t-[0.5px] border-l-[0.5px] border-[var(--dada-red)]/50 pointer-events-none transition-all duration-700 group-hover:w-14 group-hover:h-14 group-hover:border-[var(--dada-red)]" />
      <div className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 border-t-[0.5px] border-r-[0.5px] border-[var(--dada-red)]/50 pointer-events-none transition-all duration-700 group-hover:w-14 group-hover:h-14 group-hover:border-[var(--dada-red)]" />
      <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 w-10 h-10 md:w-12 md:h-12 border-b-[0.5px] border-l-[0.5px] border-[var(--dada-red)]/50 pointer-events-none transition-all duration-700 group-hover:w-14 group-hover:h-14 group-hover:border-[var(--dada-red)]" />
      <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-10 h-10 md:w-12 md:h-12 border-b-[0.5px] border-r-[0.5px] border-[var(--dada-red)]/50 pointer-events-none transition-all duration-700 group-hover:w-14 group-hover:h-14 group-hover:border-[var(--dada-red)]" />
      
      <div className={`absolute inset-x-0 bottom-0 z-20 px-5 pt-12 md:px-8 md:pb-14 md:pt-20 flex flex-col justify-end ${service.title === 'Photography Sessions' ? 'pb-[52px]' : 'pb-10'}`}>
        <h4 className="text-base md:text-xl lg:text-2xl font-serif text-white tracking-[0.15em] font-light drop-shadow-lg">
          {service.title}
        </h4>
        <p className={`font-mono text-[9px] md:text-[10px] text-white/60 uppercase tracking-widest mt-2 md:mt-3 max-w-[200px] leading-relaxed transition-all duration-500 delay-100 overflow-hidden ${showDesc ? 'opacity-100 translate-y-0 max-h-40' : 'opacity-0 max-h-0 md:opacity-100 md:max-h-40'} group-hover:opacity-100 group-hover:translate-y-0 group-hover:max-h-40`}>
          {service.description}
        </p>
        <p className={`font-mono text-[10px] md:text-xs text-white/70 uppercase tracking-widest mt-2 md:mt-4 flex items-center gap-3 transition-all duration-500 delay-200 ${showDesc ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 md:opacity-100 md:translate-y-0'} group-hover:opacity-100 group-hover:translate-y-0`}>
          <span>{tapped ? 'Tap to Enquire' : 'Enquire'}</span>
          <span className="w-6 h-[1px] bg-white/70 inline-block"></span>
        </p>
      </div>
    </motion.div>
  );
}

function ShopCTA({ onClick }: { onClick: () => void }) {
  const [pulsed, setPulsed] = useState(false);
  const shopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = shopRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !pulsed) {
          setPulsed(true);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [pulsed]);

  return (
    <div className="flex flex-col items-center mt-20 mb-12 relative z-40 gap-6">
      <div
        ref={shopRef}
        onClick={onClick}
        className="group relative w-32 h-32 md:w-36 md:h-36 rounded-full border border-[var(--text-muted)]/30 hover:border-[var(--dada-red)] transition-all duration-700 cursor-pointer flex items-center justify-center overflow-hidden"
      >
        {/* Auto-pulse fill on first view */}
        {pulsed && (
          <div
            className="absolute inset-0 rounded-full bg-[var(--dada-red)] pointer-events-none"
            style={{
              animation: 'shopPulse 2.5s ease-in-out forwards',
            }}
          />
        )}
        {/* Fill circle on hover */}
        <div className="absolute inset-0 rounded-full transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] bg-[var(--dada-red)] scale-0 group-hover:scale-100" />
        
        {/* Rotating ring text */}
        <svg className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite]" viewBox="0 0 140 140">
          <defs>
            <path id="circlePath" d="M 70,70 m -52,0 a 52,52 0 1,1 104,0 a 52,52 0 1,1 -104,0" />
          </defs>
          <text className="transition-colors duration-700 fill-[var(--text-muted)]/60 group-hover:fill-white/60" style={{ fontSize: '10px', letterSpacing: '6px', fontFamily: 'monospace', textTransform: 'uppercase' }}>
            <textPath href="#circlePath">SHOP THE COLLECTION · SHOP THE COLLECTION ·</textPath>
          </text>
        </svg>
        
        {/* Center text */}
        <span className="relative z-10 font-serif italic text-xl md:text-2xl tracking-wider transition-colors duration-500 text-[var(--text-main)] group-hover:text-white">Shop</span>
      </div>
    </div>
  );
}

export function EditorialCollection() {
  const [selectedDress, setSelectedDress] = useState<DressItem | null>(null);
  const [dressFromShop, setDressFromShop] = useState(false);
  const [enquiryService, setEnquiryService] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("Dresses");
  const [showAllItems, setShowAllItems] = useState(false);
  const [imageOverrides, setImageOverrides] = useState<Record<string, string>>(() => {
    const defaults = {
      "Blush Enchantress": "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2F2f7c3f0f-2025-4098-86e5-76e1b21fe5e4?alt=media&token=b174088f-754a-49ef-8d45-ffe114715f60",
      "Blush Couture": "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2F4f8b61de-f7ce-4eab-8056-b80769b17b73?alt=media&token=79857bc2-e2ed-4e7f-9a3a-47cd52717ef9",
      "Crimson Allure": "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2F04669707-071a-432c-82e4-76b144da07e4?alt=media&token=87ed9797-099d-4c08-ad4e-bcac6cc65c4b",
      "Midnight Elegance": "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2Ff4c8fe02-afaa-458f-b217-bc5a3a57ea00?alt=media&token=697ddc89-dcdd-432d-9e94-a4c759b5027e",
      "Golden Whisper": "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2Fa233bbdb-25ac-47fe-b686-71493e2cc226?alt=media&token=447745e0-6fd4-4fe0-b328-63b25f3199e0",
      "Fuchsia Majesty": "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2Ff5720508-8148-4bd3-ab0f-2b8612f15cda?alt=media&token=7be40366-58e3-4eb1-91c8-f24d29299550"
    };
    if (typeof window === 'undefined') return defaults;
    try {
      const raw = localStorage.getItem('artcouture_image_overrides');
      return raw ? JSON.parse(raw) : defaults;
    } catch {
      return defaults;
    }
  });
  const [hiddenItems, setHiddenItems] = useState<string[]>(() => {
    const defaults = [
      "Pearl Symphony",
      "Golden Hour",
      "Crystal Steps",
      "Obsidian Clutch",
      "Velvet Veil",
      "Noir Power",
      "Ivory Architecture",
      "Crimson Drape",
      "Onyx Edge",
      "Tweed Illusion",
      "Ivory Cascade",
      "Chiffon Whisper",
      "Satin Armor",
      "Organza Cloud",
      "Silk Essential",
      "Lace Romance"
    ];
    if (typeof window === 'undefined') return defaults;
    try {
      const raw = localStorage.getItem('artcouture_hidden_items');
      return raw ? JSON.parse(raw) : defaults;
    } catch {
      return defaults;
    }
  });
  const [vaultAlts, setVaultAlts] = useState<Record<string, string>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const raw = localStorage.getItem('artcouture_vault_alts');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });
  const [vaultThumbnails, setVaultThumbnails] = useState<Record<string, string>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const raw = localStorage.getItem('artcouture_vault_thumbnails');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });
  const [shopOpen, setShopOpen] = useState(false);
  const [shopCategory, setShopCategory] = useState<string>("All");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const dressTitle = params.get("dress");
      if (dressTitle) {
        const matched = collection.find(
          (item) => item.title.toLowerCase() === dressTitle.toLowerCase()
        );
        if (matched) {
          setSelectedDress(matched);
          setTimeout(() => {
            const el = document.getElementById("collections");
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }, 100);
        }
      }
    }
  }, []);

  useEffect(() => {
    // 1. Initial load from localStorage for instant preview
    try {
      const rawOverrides = localStorage.getItem('artcouture_image_overrides');
      if (rawOverrides) setImageOverrides(JSON.parse(rawOverrides));
    } catch {}
    try {
      const rawHidden = localStorage.getItem('artcouture_hidden_items');
      if (rawHidden) setHiddenItems(JSON.parse(rawHidden));
    } catch {}
    try {
      const rawVaultAlts = localStorage.getItem('artcouture_vault_alts');
      if (rawVaultAlts) setVaultAlts(JSON.parse(rawVaultAlts));
    } catch {}
    try {
      const rawVaultThumbs = localStorage.getItem('artcouture_vault_thumbnails');
      if (rawVaultThumbs) setVaultThumbnails(JSON.parse(rawVaultThumbs));
    } catch {}

    // 2. Fetch/Sync from Firestore in real-time
    let unsubHidden: (() => void) | undefined;
    let unsubOverrides: (() => void) | undefined;

    const setupRealtimeConfigs = async () => {
      try {
        const { doc, onSnapshot, collection: fsCollection, getDocs } = await import('firebase/firestore');
        const { db } = await import('@/lib/firebase');

        // Real-time hidden items listener
        unsubHidden = onSnapshot(doc(db, 'config', 'hidden_items'), (snap) => {
          if (snap.exists()) {
            const data = snap.data();
            const list = data.hiddenList || [];
            setHiddenItems(list);
            localStorage.setItem('artcouture_hidden_items', JSON.stringify(list));
          }
        }, (err) => {
          console.error("Real-time hidden items sync failed:", err);
        });

        // Real-time image overrides listener
        unsubOverrides = onSnapshot(doc(db, 'config', 'image_overrides'), (snap) => {
          if (snap.exists()) {
            const data = snap.data() as Record<string, string>;
            setImageOverrides(data);
            localStorage.setItem('artcouture_image_overrides', JSON.stringify(data));
          }
        }, (err) => {
          console.error("Real-time image overrides sync failed:", err);
        });

        // Fetch vault images for Alt SEO & Thumbnail mapping
        try {
          const { getDocs } = await import('firebase/firestore');
          const vaultSnap = await getDocs(fsCollection(db, 'vault'));
          const altMapping: Record<string, string> = {};
          const thumbMapping: Record<string, string> = {};
          vaultSnap.forEach((doc) => {
            const data = doc.data();
            if (data.url) {
              if (data.altText) altMapping[data.url] = data.altText;
              if (data.thumbnailUrl) {
                thumbMapping[data.url] = data.thumbnailUrl;
              }
            }
          });
          setVaultAlts(altMapping);
          setVaultThumbnails(thumbMapping);
          localStorage.setItem('artcouture_vault_alts', JSON.stringify(altMapping));
          localStorage.setItem('artcouture_vault_thumbnails', JSON.stringify(thumbMapping));
        } catch (vaultErr) {
          console.error("Failed to sync vault configs:", vaultErr);
        }
      } catch (e) {
        console.error("Firestore config sync failed:", e);
      }
    };
    setupRealtimeConfigs();

    return () => {
      if (unsubHidden) unsubHidden();
      if (unsubOverrides) unsubOverrides();
    };
  }, []);

  useEffect(() => {
    setShowAllItems(false);
  }, [activeCategory]);

  const visibleCollection = collection.filter(item => !hiddenItems.includes(item.title));
  const categories = Array.from(new Set(visibleCollection.map(item => item.category)));
  const floatingCategories = categories.filter(c => c !== activeCategory);

  const filteredCollection = visibleCollection.filter(item => item.category === activeCategory);

  const displayedCollection = showAllItems 
    ? filteredCollection 
    : filteredCollection.slice(0, 6);

  // Split into 3 columns for Masonry layout
  const col1 = displayedCollection.filter((_, i) => i % 3 === 0);
  const col2 = displayedCollection.filter((_, i) => i % 3 === 1);
  const col3 = displayedCollection.filter((_, i) => i % 3 === 2);

  const getCategoryPreview = (categoryName: string) => {
    return collection.find(item => item.category === categoryName);
  };

  useEffect(() => {
    if (selectedDress || shopOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [selectedDress, shopOpen]);

  // Listen for 'openShop' event from Header's Shop Boutique button
  useEffect(() => {
    const handleOpenShop = () => setShopOpen(true);
    window.addEventListener('openShop', handleOpenShop);
    return () => window.removeEventListener('openShop', handleOpenShop);
  }, []);

  // Resolve offerings config: localStorage override or default. Re-read when shop opens.
  const [offeringsConfig, setOfferingsConfig] = useState<Record<string, { purchaseSample: { enabled: boolean; price: string; stripeLink: string } }>>(() => {
    if (typeof window === 'undefined') return defaultOfferingsConfig as Record<string, { purchaseSample: { enabled: boolean; price: string; stripeLink: string } }>;
    try {
      const raw = localStorage.getItem('artcouture_offerings');
      if (raw) return JSON.parse(raw) as Record<string, { purchaseSample: { enabled: boolean; price: string; stripeLink: string } }>;
    } catch {
      // ignore
    }
    return defaultOfferingsConfig as Record<string, { purchaseSample: { enabled: boolean; price: string; stripeLink: string } }>;
  });

  // Re-read config from localStorage & Firestore every time shop opens to pick up admin changes
  useEffect(() => {
    if (shopOpen) {
      try {
        const raw = localStorage.getItem('artcouture_offerings');
        if (raw) setOfferingsConfig(JSON.parse(raw));
      } catch {}

      // Background fetch from Firestore
      const syncOfferings = async () => {
        try {
          const { doc, getDoc } = await import('firebase/firestore');
          const { db } = await import('@/lib/firebase');
          const offeringsRef = doc(db, 'config', 'offerings');
          const offeringsSnap = await getDoc(offeringsRef);
          if (offeringsSnap.exists()) {
            const data = offeringsSnap.data();
            setOfferingsConfig(data as any);
            localStorage.setItem('artcouture_offerings', JSON.stringify(data));
          }
        } catch (e) {
          console.error("Firestore offerings sync failed:", e);
        }
      };
      syncOfferings();
    }
  }, [shopOpen]);

  const shopItems = useMemo(() => {
    return visibleCollection.filter(item => {
      const config = offeringsConfig[item.title];
      if (!config) return false;
      return (
        config.purchaseSample?.enabled ||
        (config as any).commissionBespoke?.enabled ||
        (config as any).rentPhotoshoot?.enabled
      );
    }).map(item => {
      const config = offeringsConfig[item.title];
      const displayItem = imageOverrides[item.title]
        ? { ...item, img: imageOverrides[item.title] }
        : item;
      return {
        ...displayItem,
        shopPrice: config?.purchaseSample?.enabled
          ? (config.purchaseSample.price || item.price)
          : item.price,
      };
    });
  }, [offeringsConfig, imageOverrides, visibleCollection]);

  return (
    <section id="collection-start" className="bg-[var(--background)] py-32 md:py-48 relative min-h-[100vh]">
      <div className="max-w-[65rem] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-[5rem] md:text-[8rem] lg:text-[10rem] font-serif font-extralight text-[var(--text-main)] leading-[0.9] tracking-tight mb-8">The Collection</h2>
          <p className="font-mono text-xs md:text-sm uppercase tracking-[0.4em] text-[var(--text-muted)] mb-8">Select an exquisite piece to reveal its story</p>
          <div className="flex justify-center mb-4">
            <a
              href="/lookbook"
              className="group inline-flex items-center gap-5 cursor-pointer"
            >
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/30 group-hover:text-[var(--dada-red)] transition-colors duration-300">
                View Editorial Lookbook
              </span>
              <span className="relative w-12 h-[1px] bg-white/15 group-hover:bg-[var(--dada-red)] transition-all duration-500 overflow-hidden">
                <span className="absolute inset-0 bg-[var(--dada-red)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              </span>
            </a>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center mb-24 relative z-40">
          <div className="grid grid-cols-2 md:flex md:items-center gap-y-6 gap-x-10 md:gap-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="relative font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] pb-3 transition-colors duration-300 whitespace-nowrap text-center"
                style={{ color: activeCategory === cat ? 'var(--text-main)' : 'var(--text-muted)' }}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div
                    layoutId="categoryIndicator"
                    className="absolute bottom-0 left-1/4 right-1/4 md:left-0 md:right-0 h-[1.5px] bg-[var(--dada-red)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="relative min-h-[600px]">
          <motion.div 
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12 max-w-[85%] md:max-w-none mx-auto"
          >
            {/* Column 1 */}
            <div className="flex flex-col gap-8 lg:gap-12 md:w-1/3">
              {col1.map((item, idx) => {
                const displayItem = imageOverrides[item.title]
                  ? { ...item, img: imageOverrides[item.title] }
                  : item;
                return (
                  <DressCard 
                    key={item.title + idx} 
                    item={displayItem} 
                    altText={vaultAlts[displayItem.img]} 
                    priority={idx === 0}
                    thumbnailUrl={vaultThumbnails[displayItem.img]}
                    onClick={() => setSelectedDress(displayItem)} 
                  />
                );
              })}
            </div>
            
            {/* Column 2 - Offset visually */}
            <div className="flex flex-col gap-8 lg:gap-12 md:w-1/3 md:pt-32">
              {col2.map((item, idx) => {
                const displayItem = imageOverrides[item.title]
                  ? { ...item, img: imageOverrides[item.title] }
                  : item;
                return (
                  <DressCard 
                    key={item.title + idx} 
                    item={displayItem} 
                    altText={vaultAlts[displayItem.img]} 
                    priority={idx === 0 && !isMobile}
                    thumbnailUrl={vaultThumbnails[displayItem.img]}
                    onClick={() => setSelectedDress(displayItem)} 
                  />
                );
              })}
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-8 lg:gap-12 md:w-1/3">
              {col3.map((item, idx) => {
                const displayItem = imageOverrides[item.title]
                  ? { ...item, img: imageOverrides[item.title] }
                  : item;
                return (
                  <DressCard 
                    key={item.title + idx} 
                    item={displayItem} 
                    altText={vaultAlts[displayItem.img]} 
                    priority={idx === 0 && !isMobile}
                    thumbnailUrl={vaultThumbnails[displayItem.img]}
                    onClick={() => setSelectedDress(displayItem)} 
                  />
                );
              })}
            </div>
          </motion.div>
        </div>

        {filteredCollection.length > 6 && !showAllItems && (
          <div className="flex justify-center mt-16 mb-8 relative z-40">
            <button
              onClick={() => setShowAllItems(true)}
              className="group flex items-center gap-4 border border-[var(--text-muted)]/30 px-8 py-4 hover:border-[var(--dada-red)] transition-colors duration-300 cursor-pointer"
            >
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--text-main)]">More</span>
              <span className="w-8 h-[1px] bg-[var(--text-muted)] group-hover:bg-[var(--dada-red)] transition-colors duration-300"></span>
            </button>
          </div>
        )}

        {/* Shop the Collection CTA */}
        <ShopCTA onClick={() => setShopOpen(true)} />
      </div>

      {/* Enquiry Modal */}
      <AnimatePresence>
        {enquiryService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6"
            onClick={() => setEnquiryService(null)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative bg-[#0a0a0a] border border-white/10 w-full max-w-lg p-10 md:p-14"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button 
                onClick={() => setEnquiryService(null)}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <span className="block font-serif italic text-sm uppercase tracking-[0.2em] text-[var(--dada-red)] mb-4">Enquire</span>
              <h3 className="text-3xl md:text-4xl font-serif font-extralight text-white mb-2">{enquiryService}</h3>
              <p className="font-mono text-xs text-white/40 uppercase tracking-widest mb-10">We&apos;ll respond within 24 hours</p>

              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const formData = new FormData(form);
                  formData.append('_subject', `Service Enquiry: ${enquiryService}`);
                  try {
                    await fetch("https://formspree.io/f/mnjyyqan", {
                      method: "POST",
                      body: formData,
                      headers: { Accept: "application/json" },
                    });
                    setEnquiryService(null);
                  } catch {
                    // Silently handle - form still closes
                    setEnquiryService(null);
                  }
                }}
                className="space-y-6"
              >
                <input type="hidden" name="service" value={enquiryService || ''} />
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2">Your Name</label>
                  <input 
                    name="name"
                    type="text" 
                    required
                    className="w-full bg-transparent border-b border-white/20 focus:border-[var(--dada-red)] outline-none text-white font-serif text-lg py-3 transition-colors duration-300 placeholder:text-white/20"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2">Email Address</label>
                  <input 
                    name="email"
                    type="email" 
                    required
                    className="w-full bg-transparent border-b border-white/20 focus:border-[var(--dada-red)] outline-none text-white font-serif text-lg py-3 transition-colors duration-300 placeholder:text-white/20"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2">Your Message</label>
                  <textarea 
                    name="message"
                    rows={4}
                    required
                    className="w-full bg-transparent border-b border-white/20 focus:border-[var(--dada-red)] outline-none text-white font-serif text-lg py-3 transition-colors duration-300 resize-none placeholder:text-white/20"
                    placeholder="Tell us about your vision..."
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full mt-4 py-4 bg-[var(--dada-red)] text-white font-mono text-xs uppercase tracking-[0.3em] hover:bg-[var(--dada-red)]/80 transition-colors duration-300 cursor-pointer"
                >
                  Send Enquiry
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shop Overlay */}
      <AnimatePresence>
        {shopOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[99998] overflow-y-auto overscroll-contain"
            data-lenis-prevent
            onClick={() => setShopOpen(false)}
          >
            {/* Frosted background */}
            <div className="fixed inset-0 bg-[#fafaf8]/95 backdrop-blur-2xl pointer-events-none" />

            {/* Content container */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="relative z-10 min-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="pt-10 pb-6 md:pt-16 md:pb-10 px-6 md:px-12 text-center relative">
                {/* Close button */}
                <button
                  onClick={() => setShopOpen(false)}
                  className="absolute top-6 right-6 md:top-10 md:right-12 w-10 h-10 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--dada-red)] transition-colors duration-300 cursor-pointer"
                  aria-label="Close shop"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>

                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--dada-red)] block mb-3">Art Couture</span>
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif font-extralight text-[var(--text-main)] tracking-tight leading-none mb-4">Shop</h2>
                <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-[var(--text-muted)]">Available to Purchase</p>
                <div className="w-12 h-[1.5px] bg-[var(--dada-red)] mx-auto mt-6" />

                {/* Category Filters */}
                {(() => {
                  const categories = ["All", ...Array.from(new Set(shopItems.map(i => i.category)))];
                  return categories.length > 2 ? (
                    <div className="flex items-center justify-center gap-2 md:gap-4 mt-8 flex-wrap">
                      {categories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setShopCategory(cat)}
                          className={`font-mono text-[9px] md:text-[10px] uppercase tracking-[0.25em] px-4 py-2 transition-all duration-300 cursor-pointer border ${
                            shopCategory === cat
                              ? 'border-[var(--dada-red)] text-[var(--dada-red)] bg-[var(--dada-red)]/5'
                              : 'border-black/10 text-[var(--text-muted)] hover:border-black/30 hover:text-[var(--text-main)]'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  ) : null;
                })()}
              </div>

              {/* Grid */}
              <div className="px-6 md:px-12 lg:px-20 pb-16">
                {shopItems.length > 0 ? (
                  <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
                      {shopItems.filter(item => shopCategory === "All" || item.category === shopCategory).map((item, idx) => (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.15 + idx * 0.08, ease: "easeOut" }}
                          className="group cursor-pointer"
                          onClick={() => {
                            const originalItem = collection.find(c => c.title === item.title);
                            if (originalItem) {
                              const displayItem = imageOverrides[originalItem.title]
                                ? { ...originalItem, img: imageOverrides[originalItem.title] }
                                : originalItem;
                              setSelectedDress(displayItem);
                              setDressFromShop(true);
                              setShopOpen(false);
                            }
                          }}
                        >
                          {/* Clean Image Card */}
                          <div className="relative overflow-hidden rounded-lg shadow-[0_2px_16px_rgba(0,0,0,0.06)] group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-shadow duration-500">
                            <div className="aspect-[3/4]">
                              <img
                                src={item.img}
                                alt={item.title}
                                loading="lazy"
                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.03]"
                              />
                            </div>
                            {/* Bottom gradient for name overlay */}
                            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 via-black/20 to-transparent pointer-events-none" />
                            {/* Name and price on image */}
                            <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                              <h3 className="font-serif text-sm md:text-base font-light text-white tracking-wide leading-tight drop-shadow-md">
                                {item.title}
                              </h3>
                              <p className="font-mono text-[9px] md:text-[10px] text-white/80 tracking-[0.15em] mt-1 drop-shadow-md">
                                {item.shopPrice}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Coming Soon state */
                  <div className="flex flex-col items-center justify-center h-full min-h-[40vh] text-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="space-y-6"
                    >
                      {/* Decorative diamond */}
                      <div className="w-12 h-12 border border-[var(--text-muted)]/30 rotate-45 mx-auto flex items-center justify-center">
                        <div className="w-2 h-2 bg-[var(--dada-red)] rotate-45" />
                      </div>
                      <h3 className="font-serif text-3xl md:text-4xl font-extralight text-[var(--text-main)] tracking-wide">
                        Coming Soon
                      </h3>
                      <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-[var(--text-muted)] max-w-sm leading-relaxed">
                        Our curated selection is being prepared.<br />Check back soon.
                      </p>
                      <div className="w-8 h-[1px] bg-[var(--dada-red)]/50 mx-auto" />
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedDress && (
          <DressModal 
            dress={selectedDress} 
            onClose={() => {
              setSelectedDress(null);
              if (dressFromShop) {
                setShopOpen(true);
              }
              setDressFromShop(false);
            }}
            fromShop={dressFromShop}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export function ServicesGrid() {
  const [enquiryService, setEnquiryService] = React.useState<string | null>(null);

  return (
    <section className="py-24 md:py-32 px-6 max-w-[90rem] mx-auto">
      <div className="text-center mb-16 md:mb-24">
        <h3 className="text-[4rem] md:text-[6rem] lg:text-[8rem] font-serif font-extralight text-[var(--text-main)] mb-8 tracking-tight leading-none">Our Services</h3>
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-[var(--text-muted)]">Bespoke experiences from our atelier</p>
        <div className="w-16 h-[2px] bg-[var(--dada-red)] mx-auto mt-6" />
      </div>

      {/* Logo / Brand Seal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-md mx-auto mb-20 overflow-hidden bg-[var(--background)]"
      >
        <img 
          src="https://storage.googleapis.com/mixo-sites/images/file-1f3f0688-6519-43dd-b5ad-a14a0457a21b.jpg"
          alt="Art Couture logo by Gabrielle Benot and Charmaigne Menn"
          loading="lazy"
          className="w-full object-cover mix-blend-multiply"
        />
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {[
          { 
            title: "Bespoke Gowns", 
            description: "Custom couture created exclusively for you, from initial sketch to final fitting.",
            img: "/images/process/draping.jpg"
          },
          { 
            title: "Bridal Couture", 
            description: "Your dream wedding gown, handcrafted with the finest silks, lace, and beadwork.",
            img: "/images/process/beading.jpg"
          },
          { 
            title: "Couture Rental", 
            description: "Access our exclusive collection for red carpet events and special occasions.",
            img: "/images/process/pressing.jpg"
          },
          { 
            title: "Photography Sessions", 
            description: "Editorial-quality sessions that capture you in couture elegance.",
            img: "/images/process/painting.jpg"
          }
        ].map((service) => (
          <ServiceCard key={service.title} service={service} onEnquire={() => setEnquiryService(service.title)} />
        ))}
      </div>
      <div className="w-16 h-[2px] bg-[var(--dada-red)] mx-auto mt-12" />

      {/* Enquiry Modal */}
      <AnimatePresence>
        {enquiryService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6"
            onClick={() => setEnquiryService(null)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative bg-[#0a0a0a] border border-white/10 w-full max-w-lg p-10 md:p-14"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setEnquiryService(null)}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <span className="block font-serif italic text-sm uppercase tracking-[0.2em] text-[var(--dada-red)] mb-4">Enquire</span>
              <h3 className="text-3xl md:text-4xl font-serif font-extralight text-white mb-2">{enquiryService}</h3>
              <p className="font-mono text-xs text-white/40 uppercase tracking-widest mb-10">We&apos;ll respond within 24 hours</p>

              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const formData = new FormData(form);
                  formData.append('_subject', `Service Enquiry: ${enquiryService}`);
                  try {
                    await fetch("https://formspree.io/f/mnjyyqan", {
                      method: "POST",
                      body: formData,
                      headers: { Accept: "application/json" },
                    });
                    setEnquiryService(null);
                  } catch {
                    setEnquiryService(null);
                  }
                }}
                className="space-y-6"
              >
                <input type="hidden" name="service" value={enquiryService || ''} />
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2">Your Name</label>
                  <input 
                    name="name"
                    type="text" 
                    required
                    className="w-full bg-transparent border-b border-white/20 focus:border-[var(--dada-red)] outline-none text-white font-serif text-lg py-3 transition-colors duration-300 placeholder:text-white/20"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2">Email Address</label>
                  <input 
                    name="email"
                    type="email" 
                    required
                    className="w-full bg-transparent border-b border-white/20 focus:border-[var(--dada-red)] outline-none text-white font-serif text-lg py-3 transition-colors duration-300 placeholder:text-white/20"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2">Your Message</label>
                  <textarea 
                    name="message"
                    rows={4}
                    required
                    className="w-full bg-transparent border-b border-white/20 focus:border-[var(--dada-red)] outline-none text-white font-serif text-lg py-3 transition-colors duration-300 resize-none placeholder:text-white/20"
                    placeholder="Tell us about your vision..."
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full mt-4 py-4 bg-[var(--dada-red)] text-white font-mono text-xs uppercase tracking-[0.3em] hover:bg-[var(--dada-red)]/80 transition-colors duration-300 cursor-pointer"
                >
                  Send Enquiry
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
