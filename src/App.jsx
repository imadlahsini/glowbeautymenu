import React, { useState, useEffect, useRef, useCallback } from "react";

const salonData = {
  categories: [
    { id: "head-spa", name: "Head Spa", image: "https://picsum.photos/seed/headspa22/200/200", heroImage: "https://picsum.photos/seed/headspa22/800/1200", services: [
      { id: 1, name: "Royale Head Spa", price: 600, duration: "1h", image: "https://picsum.photos/seed/royalespa/400/300", description: "Notre soin signature le plus complet pour le cuir chevelu" },
      { id: 2, name: "Luxury Head Spa", price: 500, duration: "1h", image: "https://picsum.photos/seed/luxspa/400/300", description: "Expérience premium de bien-être capillaire" },
      { id: 3, name: "Soin Hydratant du Cuir Chevelu", price: 450, duration: "45m", image: "https://picsum.photos/seed/hydraspa/400/300", description: "Hydratation profonde et revitalisante" },
      { id: 4, name: "Rituel Relaxant du Cuir Chevelu", price: 400, duration: "40m", image: "https://picsum.photos/seed/rituelspa/400/300", description: "Massage et soin relaxant en profondeur" },
      { id: 5, name: "Head Spa Détox", price: 300, duration: "30m", image: "https://picsum.photos/seed/detoxspa/400/300", description: "Purification et détoxification du cuir chevelu" },
    ]},
    { id: "lifting", name: "Lifting", image: "https://picsum.photos/seed/lifting99/200/200", heroImage: "https://picsum.photos/seed/lifting99/800/1200", services: [
      { id: 6, name: "Lifting Colombien", price: 150, duration: "1h", image: "https://picsum.photos/seed/liftcol/400/300", description: "Remodelage facial non invasif à partir de" },
    ]},
    { id: "detatouage", name: "Détatouage", image: "https://picsum.photos/seed/tattoo55/200/200", heroImage: "https://picsum.photos/seed/tattoo55/800/1200", services: [
      { id: 7, name: "Détatouage", price: 400, duration: "1h", image: "https://picsum.photos/seed/detat/400/300", description: "Retrait de tatouage par laser à partir de" },
    ]},
    { id: "makeup", name: "Makeup Artist", image: "https://picsum.photos/seed/makeup88/200/200", heroImage: "https://picsum.photos/seed/makeup88/800/1200", services: [
      { id: 8, name: "Makeup Mariée", price: 2500, duration: "1h", image: "https://picsum.photos/seed/bridal/400/300", description: "Mise en beauté complète pour le jour J à partir de" },
      { id: 9, name: "Makeup Fiançailles", price: 1500, duration: "2h 45m", image: "https://picsum.photos/seed/fiance/400/300", description: "Look raffiné pour vos fiançailles à partir de" },
      { id: 10, name: "Makeup Invitée", price: 600, duration: "1h 30m", image: "https://picsum.photos/seed/invitee/400/300", description: "Maquillage élégant pour événement" },
      { id: 11, name: "Makeup Salon", price: 250, duration: "1h", image: "https://picsum.photos/seed/maksal/400/300", description: "Maquillage professionnel en salon" },
    ]},
    { id: "laser", name: "Épilation Laser", image: "https://picsum.photos/seed/laser77/200/200", heroImage: "https://picsum.photos/seed/laser77/800/1200", services: [
      { id: 12, name: "Corps Complet", price: 6000, duration: "2h 15m", image: "https://picsum.photos/seed/laserfull/400/300", description: "Traitement laser intégral du corps à partir de" },
      { id: 13, name: "Jambes Complet", price: 800, duration: "1h", image: "https://picsum.photos/seed/laserlegs/400/300", description: "Épilation définitive des jambes entières" },
      { id: 14, name: "Bras Complet", price: 600, duration: "1h", image: "https://picsum.photos/seed/laserarms/400/300", description: "Épilation définitive des bras entiers" },
      { id: 15, name: "Visage", price: 600, duration: "1h", image: "https://picsum.photos/seed/laserface/400/300", description: "Traitement laser complet du visage" },
      { id: 16, name: "Maillot", price: 600, duration: "1h", image: "https://picsum.photos/seed/laserbik/400/300", description: "Épilation définitive zone maillot" },
      { id: 17, name: "Les Fesses", price: 600, duration: "1h", image: "https://picsum.photos/seed/laserbut/400/300", description: "Traitement laser zone fessier" },
      { id: 18, name: "Le Dos", price: 600, duration: "1h", image: "https://picsum.photos/seed/laserback/400/300", description: "Épilation définitive du dos" },
      { id: 19, name: "Demis Jambes", price: 600, duration: "1h", image: "https://picsum.photos/seed/laserhleg/400/300", description: "Épilation laser demi-jambes" },
      { id: 20, name: "La Ventre", price: 500, duration: "1h", image: "https://picsum.photos/seed/laserbelly/400/300", description: "Traitement laser zone abdominale" },
      { id: 21, name: "Demis Bras", price: 400, duration: "1h", image: "https://picsum.photos/seed/laserharm/400/300", description: "Épilation laser demi-bras" },
      { id: 22, name: "Les Aisselles", price: 400, duration: "1h", image: "https://picsum.photos/seed/laserax/400/300", description: "Épilation définitive des aisselles" },
      { id: 23, name: "Menton", price: 200, duration: "20m", image: "https://picsum.photos/seed/laserchin/400/300", description: "Traitement laser ciblé du menton" },
    ]},
    { id: "cire", name: "Épilation Cire", image: "https://picsum.photos/seed/wax44/200/200", heroImage: "https://picsum.photos/seed/wax44/800/1200", services: [
      { id: 24, name: "Corps Complet", price: 300, duration: "1h", image: "https://picsum.photos/seed/waxfull/400/300", description: "Épilation intégrale à la cire" },
      { id: 25, name: "Maillot", price: 100, duration: "1h", image: "https://picsum.photos/seed/waxbik/400/300", description: "Épilation cire zone maillot" },
      { id: 26, name: "Jambes Complet", price: 80, duration: "1h", image: "https://picsum.photos/seed/waxlegs/400/300", description: "Épilation complète des jambes" },
      { id: 27, name: "Bras Complet", price: 60, duration: "1h", image: "https://picsum.photos/seed/waxarms/400/300", description: "Épilation complète des bras" },
      { id: 28, name: "Demis Jambes", price: 60, duration: "1h", image: "https://picsum.photos/seed/waxhleg/400/300", description: "Épilation demi-jambes" },
      { id: 29, name: "Bord de Maillot", price: 60, duration: "25m", image: "https://picsum.photos/seed/waxbord/400/300", description: "Épilation bordure maillot" },
      { id: 30, name: "Visage", price: 60, duration: "1h", image: "https://picsum.photos/seed/waxface/400/300", description: "Épilation complète du visage" },
      { id: 31, name: "Demis Bras", price: 40, duration: "1h", image: "https://picsum.photos/seed/waxharm/400/300", description: "Épilation demi-bras" },
      { id: 32, name: "Sourcils", price: 30, duration: "20m", image: "https://picsum.photos/seed/waxbrow/400/300", description: "Mise en forme des sourcils" },
      { id: 33, name: "Aisselle", price: 30, duration: "1h", image: "https://picsum.photos/seed/waxax/400/300", description: "Épilation cire des aisselles" },
      { id: 34, name: "Menton", price: 30, duration: "1h", image: "https://picsum.photos/seed/waxchin/400/300", description: "Épilation cire du menton" },
      { id: 35, name: "Duvet", price: 20, duration: "10m", image: "https://picsum.photos/seed/waxduv/400/300", description: "Épilation du duvet" },
    ]},
    { id: "visage", name: "Soin Visage", image: "https://picsum.photos/seed/face33/200/200", heroImage: "https://picsum.photos/seed/face33/800/1200", services: [
      { id: 36, name: "Blanchiment Dentaire", price: 800, duration: "30m", image: "https://picsum.photos/seed/teeth/400/300", description: "Éclaircissement dentaire professionnel à partir de" },
      { id: 37, name: "Soin Hydrafacial Médical", price: 600, duration: "1h", image: "https://picsum.photos/seed/hydmed/400/300", description: "Soin hydrafacial de grade médical à partir de" },
      { id: 38, name: "Soin Éclat", price: 600, duration: "1h", image: "https://picsum.photos/seed/eclat/400/300", description: "Soin luminosité et éclat du teint" },
      { id: 39, name: "Soin Anti Acné", price: 500, duration: "1h", image: "https://picsum.photos/seed/antiacne/400/300", description: "Traitement ciblé contre l'acné" },
      { id: 40, name: "Microneedling", price: 400, duration: "1h", image: "https://picsum.photos/seed/micron/400/300", description: "Stimulation collagène par micro-aiguilles à partir de" },
      { id: 41, name: "Soin Anti Tâche", price: 400, duration: "1h", image: "https://picsum.photos/seed/antitache/400/300", description: "Traitement correcteur des tâches pigmentaires" },
      { id: 42, name: "Hydrafacial Simple", price: 300, duration: "1h", image: "https://picsum.photos/seed/hydsimp/400/300", description: "Soin hydrafacial nettoyant et hydratant" },
      { id: 43, name: "Soin Visage Classique", price: 250, duration: "1h", image: "https://picsum.photos/seed/classique/400/300", description: "Soin complet nettoyage et hydratation" },
      { id: 44, name: "Soin Hydratant", price: 200, duration: "1h", image: "https://picsum.photos/seed/hydrat/400/300", description: "Hydratation en profondeur du visage" },
    ]},
    { id: "onglerie", name: "Onglerie", image: "https://picsum.photos/seed/nails22/200/200", heroImage: "https://picsum.photos/seed/nails22/800/1200", services: [
      { id: 45, name: "Gel", price: 300, duration: "1h", image: "https://picsum.photos/seed/gel/400/300", description: "Pose complète de gel à partir de" },
      { id: 46, name: "BIAB", price: 300, duration: "1h", image: "https://picsum.photos/seed/biab/400/300", description: "Builder In A Bottle — renforcement naturel à partir de" },
      { id: 47, name: "Remplissage de Gel", price: 250, duration: "1h 30m", image: "https://picsum.photos/seed/rempli/400/300", description: "Retouche et remplissage gel" },
      { id: 48, name: "Gel Pieds", price: 250, duration: "1h", image: "https://picsum.photos/seed/gelpied/400/300", description: "Pose gel sur les pieds" },
      { id: 49, name: "Faux Ongle Permanent", price: 250, duration: "1h", image: "https://picsum.photos/seed/fauxong/400/300", description: "Extensions d'ongles longue tenue" },
      { id: 50, name: "Pédicure Médical", price: 250, duration: "1h", image: "https://picsum.photos/seed/pedmed/400/300", description: "Soin des pieds médical complet" },
      { id: 51, name: "Vernis Permanent", price: 150, duration: "1h", image: "https://picsum.photos/seed/vernperm/400/300", description: "Vernis semi-permanent longue tenue" },
      { id: 52, name: "Pédicure Spa", price: 150, duration: "1h", image: "https://picsum.photos/seed/pedspa/400/300", description: "Soin pédicure relaxant et complet" },
      { id: 53, name: "Manicure Spa", price: 100, duration: "1h", image: "https://picsum.photos/seed/manspa/400/300", description: "Soin manucure avec massage" },
      { id: 54, name: "Pédicure Normal", price: 100, duration: "1h", image: "https://picsum.photos/seed/pednorm/400/300", description: "Pédicure classique et soignée" },
      { id: 55, name: "Dépose Gel", price: 100, duration: "1h", image: "https://picsum.photos/seed/deposegel/400/300", description: "Retrait gel en douceur" },
      { id: 56, name: "Manicure", price: 50, duration: "1h", image: "https://picsum.photos/seed/manu/400/300", description: "Manucure classique à partir de" },
      { id: 57, name: "Nail Art", price: 50, duration: "1h", image: "https://picsum.photos/seed/nailart/400/300", description: "Décorations et designs personnalisés à partir de" },
      { id: 58, name: "Vernis Normal", price: 50, duration: "1h", image: "https://picsum.photos/seed/vernnorm/400/300", description: "Application vernis classique" },
      { id: 59, name: "Dépose Permanent", price: 50, duration: "1h", image: "https://picsum.photos/seed/deposeperm/400/300", description: "Retrait vernis semi-permanent" },
    ]},
    { id: "hair", name: "Hair & Styling", image: "https://picsum.photos/seed/hair11/200/200", heroImage: "https://picsum.photos/seed/hair11/800/1200", services: [
      { id: 60, name: "Protéine Black Diamond Gold", price: 1500, duration: "3h 15m", image: "https://picsum.photos/seed/diamondg/400/300", description: "Soin protéiné premium Diamond Gold à partir de" },
      { id: 61, name: "Protéine Goldery", price: 1500, duration: "3h", image: "https://picsum.photos/seed/goldery/400/300", description: "Traitement protéiné Goldery luxe à partir de" },
      { id: 62, name: "Protéine Spanish Latté", price: 1500, duration: "3h", image: "https://picsum.photos/seed/splatte/400/300", description: "Soin protéiné Spanish Latté complet à partir de" },
      { id: 63, name: "Spanish Latté Racine", price: 1200, duration: "2h", image: "https://picsum.photos/seed/splatrac/400/300", description: "Application racine Spanish Latté à partir de" },
      { id: 64, name: "Balayage", price: 800, duration: "4h 30m", image: "https://picsum.photos/seed/balayage/400/300", description: "Balayage peint à la main à partir de" },
      { id: 65, name: "Les Mèches", price: 700, duration: "1h", image: "https://picsum.photos/seed/meches/400/300", description: "Mèches et reflets personnalisés" },
      { id: 66, name: "Protéine Black Normal", price: 700, duration: "3h 45m", image: "https://picsum.photos/seed/protnorm/400/300", description: "Soin protéiné Black classique à partir de" },
      { id: 67, name: "Soin Plasma", price: 600, duration: "1h", image: "https://picsum.photos/seed/plasma/400/300", description: "Traitement capillaire au plasma à partir de" },
      { id: 68, name: "Protéine Racine", price: 500, duration: "1h", image: "https://picsum.photos/seed/protrac/400/300", description: "Application protéine sur racines à partir de" },
      { id: 69, name: "Soin Caviar", price: 500, duration: "1h", image: "https://picsum.photos/seed/caviar/400/300", description: "Soin réparateur au caviar" },
      { id: 70, name: "Coloration Normal", price: 400, duration: "1h 15m", image: "https://picsum.photos/seed/colornorm/400/300", description: "Coloration complète à partir de" },
      { id: 71, name: "Soin Kevin Murphy", price: 400, duration: "1h", image: "https://picsum.photos/seed/kevinm/400/300", description: "Soin professionnel Kevin Murphy" },
      { id: 72, name: "Soin Nashi", price: 400, duration: "1h", image: "https://picsum.photos/seed/nashi/400/300", description: "Traitement capillaire Nashi Argan à partir de" },
      { id: 73, name: "Soin Olaplex", price: 350, duration: "1h", image: "https://picsum.photos/seed/olaplex/400/300", description: "Réparation moléculaire Olaplex" },
      { id: 74, name: "Chignon", price: 300, duration: "1h", image: "https://picsum.photos/seed/chignon/400/300", description: "Chignon élégant pour événement à partir de" },
      { id: 75, name: "Coloration Racine", price: 250, duration: "1h", image: "https://picsum.photos/seed/colorrac/400/300", description: "Retouche coloration racines à partir de" },
      { id: 76, name: "Soin Hydratant Normal", price: 250, duration: "1h", image: "https://picsum.photos/seed/hydnorm/400/300", description: "Soin hydratation capillaire classique" },
      { id: 77, name: "Coupe", price: 150, duration: "45m", image: "https://picsum.photos/seed/coupe/400/300", description: "Coupe personnalisée à partir de" },
      { id: 78, name: "Brushing", price: 50, duration: "35m", image: "https://picsum.photos/seed/brushing/400/300", description: "Brushing professionnel à partir de" },
      { id: 79, name: "Coupe Pointe", price: 50, duration: "1h", image: "https://picsum.photos/seed/pointe/400/300", description: "Rafraîchissement des pointes" },
      { id: 80, name: "Doze Shampoing Nashi", price: 30, duration: "20m", image: "https://picsum.photos/seed/nashishamp/400/300", description: "Shampoing professionnel Nashi Argan" },
      { id: 81, name: "Coupe Franche", price: 30, duration: "1h", image: "https://picsum.photos/seed/franche/400/300", description: "Coupe franche nette et précise" },
      { id: 82, name: "Extension Stickers", price: 30, duration: "1h", image: "https://picsum.photos/seed/extstick/400/300", description: "Extensions adhésives à partir de" },
      { id: 83, name: "Extension 6D", price: 20, duration: "1h", image: "https://picsum.photos/seed/ext6d/400/300", description: "Extensions 6D ultra-légères à partir de" },
    ]},
    { id: "brows", name: "Eyebrows & Eyelashes", image: "https://picsum.photos/seed/brows66/200/200", heroImage: "https://picsum.photos/seed/brows66/800/1200", services: [
      { id: 84, name: "Cils Permanent", price: 400, duration: "1h", image: "https://picsum.photos/seed/cilsperm/400/300", description: "Pose de cils permanents à partir de" },
      { id: 85, name: "Brow Lift", price: 300, duration: "1h", image: "https://picsum.photos/seed/browlift/400/300", description: "Restructuration et lamination des sourcils à partir de" },
      { id: 86, name: "Cils Normal", price: 100, duration: "1h", image: "https://picsum.photos/seed/cilsnorm/400/300", description: "Pose de cils classique" },
      { id: 87, name: "Coloration Sourcils", price: 50, duration: "1h", image: "https://picsum.photos/seed/colsourc/400/300", description: "Teinture professionnelle des sourcils" },
    ]},
  ]
};

/* ─── Responsive radius + node size ─── */
function useResponsiveRadius() {
  const [radius, setRadius] = useState(140);
  const [nodeSize, setNodeSize] = useState(60);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1024) { setRadius(200); setNodeSize(76); }
      else if (w >= 768) { setRadius(175); setNodeSize(70); }
      else if (w >= 480) { setRadius(150); setNodeSize(64); }
      else { setRadius(120); setNodeSize(54); }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return { radius, nodeSize };
}

/* ─── Safe image with loading/error states ─── */
function SafeImage({ src, alt, style, ...props }) {
  const [status, setStatus] = useState("loading");
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", ...style }}>
      {status === "loading" && (
        <div style={{
          position: "absolute", inset: 0, background: "rgba(255,255,255,0.06)",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{
            width: "20px", height: "20px",
            border: "2px solid rgba(255,255,255,0.1)", borderTopColor: "rgba(255,255,255,0.4)",
            borderRadius: "50%", animation: "spin 0.8s linear infinite"
          }} />
        </div>
      )}
      {status === "error" ? (
        <div style={{
          width: "100%", height: "100%",
          background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "12px", color: "rgba(255,255,255,0.25)"
        }}>✦</div>
      ) : (
        <img src={src} alt={alt}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          draggable={false}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            opacity: status === "loaded" ? 1 : 0, transition: "opacity 0.3s ease"
          }}
          {...props}
        />
      )}
    </div>
  );
}

/* ─── Generate image variants from a service's seed URL ─── */
function getServiceImages(imageUrl, count = 4) {
  // Extract seed from URL like "https://picsum.photos/seed/royalespa/400/300"
  const match = imageUrl.match(/\/seed\/([^/]+)\//);
  if (!match) return [imageUrl];
  const baseSeed = match[1];
  return Array.from({ length: count }, (_, i) =>
    imageUrl.replace(`/seed/${baseSeed}/`, `/seed/${baseSeed}${i === 0 ? "" : "v" + (i + 1)}/`)
  );
}

/* ─── Stories-style service viewer ─── */
const STORY_DURATION = 5000;

function StoryViewer({ service, categoryName, onClose }) {
  const images = getServiceImages(service.image, 4);
  const count = images.length;

  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const timerRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const dragStartY = useRef(0);

  // Animate info in
  useEffect(() => {
    const t = setTimeout(() => setInfoVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  // Progress animation loop — pauses during drag/dismiss
  useEffect(() => {
    startTimeRef.current = Date.now();
    setProgress(0);

    const tick = () => {
      if (isDragging || dismissed) {
        // Pause: shift start time forward so progress doesn't jump when resuming
        startTimeRef.current = Date.now() - (progress * STORY_DURATION);
        timerRef.current = requestAnimationFrame(tick);
        return;
      }

      const elapsed = Date.now() - startTimeRef.current;
      const p = Math.min(elapsed / STORY_DURATION, 1);
      setProgress(p);

      if (p >= 1) {
        if (current < count - 1) {
          goTo(current + 1);
        }
        // Don't auto-close on last image — let user dismiss manually
        return;
      }
      timerRef.current = requestAnimationFrame(tick);
    };

    timerRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(timerRef.current);
  }, [current, count, isDragging, dismissed]);

  const goTo = (idx) => {
    if (idx < 0 || idx >= count || transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(idx);
      setProgress(0);
      startTimeRef.current = Date.now();
      setTransitioning(false);
    }, 150);
  };

  // Tap zones — left 30% = prev, right 70% = next
  const handleTap = (e) => {
    if (isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX || e.changedTouches?.[0]?.clientX) - rect.left;
    const ratio = x / rect.width;

    if (ratio < 0.3) {
      goTo(current - 1);
    } else {
      if (current < count - 1) {
        goTo(current + 1);
      } else {
        onClose();
      }
    }
  };

  // Swipe down to dismiss
  const handleTouchStart = (e) => {
    dragStartY.current = e.touches[0].clientY;
    setIsDragging(false);
  };

  const handleTouchMove = (e) => {
    const dy = e.touches[0].clientY - dragStartY.current;
    if (dy > 10) {
      setIsDragging(true);
      setDragY(Math.max(0, dy));
    }
  };

  const handleTouchEnd = () => {
    if (dragY > 120) {
      setDismissed(true);
      setTimeout(onClose, 350);
    } else {
      setDragY(0);
    }
    setTimeout(() => setIsDragging(false), 50);
  };

  const dismissProgress = Math.min(dragY / 300, 1);
  const scale = 1 - dismissProgress * 0.12;
  const borderRadius = dismissProgress * 28;
  const opacity = dismissed ? 0 : 1;

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={handleTap}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: `rgba(0,0,0,${1 - dismissProgress * 0.5})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: dismissed ? "opacity 0.35s ease" : "none",
        opacity,
      }}
    >
      <div style={{
        position: "relative",
        width: "100%", height: "100%",
        transform: `translateY(${dragY}px) scale(${scale})`,
        borderRadius: `${borderRadius}px`,
        overflow: "hidden",
        transition: isDragging ? "none" : "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.35s ease",
      }}>
        {/* ── Progress bars at top ── */}
        <div style={{
          position: "absolute", top: "16px", left: "12px", right: "12px",
          display: "flex", gap: "4px", height: "3px", zIndex: 20,
        }}>
          {images.map((_, i) => (
            <div key={i} style={{
              flex: 1, borderRadius: "2px",
              background: "rgba(255,255,255,0.25)",
              overflow: "hidden",
            }}>
              <div style={{
                height: "100%", borderRadius: "2px",
                background: "#fff",
                transformOrigin: "left",
                transform: i < current
                  ? "scaleX(1)"
                  : i === current
                    ? `scaleX(${progress})`
                    : "scaleX(0)",
                transition: i === current ? "none" : "transform 0.2s ease",
              }} />
            </div>
          ))}
        </div>

        {/* ── Close button ── */}
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          style={{
            position: "absolute", top: "32px", right: "14px", zIndex: 20,
            width: "36px", height: "36px", borderRadius: "50%",
            background: "rgba(0,0,0,0.35)", backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff", fontSize: "18px", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >×</button>

        {/* ── Category label ── */}
        <div style={{
          position: "absolute", top: "36px", left: "14px", zIndex: 20,
          display: "flex", alignItems: "center", gap: "8px",
        }}>
          <span style={{
            fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.7)",
            textShadow: "0 1px 4px rgba(0,0,0,0.5)",
          }}>{categoryName}</span>
        </div>

        {/* ── Image (portrait, full bleed) ── */}
        <div style={{
          position: "absolute", inset: 0,
          opacity: transitioning ? 0.6 : 1,
          transition: "opacity 0.15s ease",
        }}>
          <img
            src={images[current]}
            alt=""
            style={{
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center",
              display: "block",
            }}
          />
        </div>

        {/* ── Bottom gradient ── */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: "60%",
          background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.95) 100%)",
          pointerEvents: "none",
        }} />

        {/* ── Service info overlay ── */}
        <div style={{
          position: "absolute", bottom: "0", left: 0, right: 0,
          padding: "0 20px 44px",
          zIndex: 10,
          opacity: infoVisible ? 1 : 0,
          transform: infoVisible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
        }}>
          {/* Price + duration — bold and clear */}
          <div style={{
            display: "flex", gap: "10px", marginBottom: "18px",
            alignItems: "baseline",
          }}>
            <span style={{
              fontSize: "36px", fontWeight: 800, letterSpacing: "-1.5px",
              lineHeight: 1,
              textShadow: "0 2px 16px rgba(0,0,0,0.5)",
            }}>
              {service.price} <span style={{ fontSize: "20px", fontWeight: 600, opacity: 0.7 }}>DH</span>
            </span>
            <div style={{
              width: "1.5px", height: "22px", background: "rgba(255,255,255,0.25)",
              margin: "0 4px",
            }} />
            <span style={{
              fontSize: "18px", fontWeight: 600, color: "rgba(255,255,255,0.7)",
              letterSpacing: "0.3px",
            }}>
              {service.duration}
            </span>
          </div>

          {/* Service name */}
          <h1 style={{
            fontSize: "32px", fontWeight: 700, margin: "0 0 10px",
            letterSpacing: "-1px", lineHeight: 1.1,
            textShadow: "0 2px 12px rgba(0,0,0,0.4)",
          }}>
            {service.name}
          </h1>

          {/* Description */}
          <p style={{
            fontSize: "15px", color: "rgba(255,255,255,0.55)",
            margin: "0 0 20px", lineHeight: 1.6, maxWidth: "320px",
          }}>
            {service.description}
          </p>

          {/* Image counter */}
          <span style={{
            fontSize: "12px", color: "rgba(255,255,255,0.3)", fontWeight: 500,
            letterSpacing: "1px",
          }}>
            {String(current + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
        </div>

        {/* ── Tap zone hints (shown briefly on open) ── */}
        <TapHints />
      </div>
    </div>
  );
}

/* Brief flash of tap zone hints on first open */
function TapHints() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 15,
      display: "flex", pointerEvents: "none",
      opacity: visible ? 1 : 0,
      transition: "opacity 0.6s ease",
    }}>
      <div style={{
        flex: "0 0 30%",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(255,255,255,0.03)",
      }}>
        <span style={{ fontSize: "24px", opacity: 0.3 }}>‹</span>
      </div>
      <div style={{ flex: 1, background: "transparent" }} />
    </div>
  );
}

/* ─── Preview card — animates from node position to center ─── */
function PreviewCard({ category, origin, onConfirm, onDismiss }) {
  const [phase, setPhase] = useState("entering"); // entering → open → exiting
  const cardRef = useRef(null);

  // Calculate offset from viewport center to node origin
  const offsetX = origin ? origin.x - window.innerWidth / 2 : 0;
  const offsetY = origin ? origin.y - window.innerHeight / 2 : 0;

  // Frame 1: render at origin. Frame 2: flip to center (triggers CSS transition)
  useEffect(() => {
    let raf2;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        setPhase("open");
      });
    });
    return () => { cancelAnimationFrame(raf1); if (raf2) cancelAnimationFrame(raf2); };
  }, []);

  const handleDismiss = () => {
    setPhase("exiting");
    setTimeout(() => onDismiss(), 350);
  };

  const handleConfirm = () => {
    setPhase("exiting");
    setTimeout(() => onConfirm(), 300);
  };

  const isAtOrigin = phase === "entering" || phase === "exiting";

  return (
    <div onClick={handleDismiss} style={{
      position: "fixed", inset: 0, zIndex: 500,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: isAtOrigin ? "transparent" : "rgba(0,0,0,0.3)",
      transition: "background 0.4s ease",
    }}>
      <div
        ref={cardRef}
        onClick={(e) => { e.stopPropagation(); handleConfirm(); }}
        style={{
          background: "rgba(20,20,20,0.95)", backdropFilter: "blur(40px)",
          borderRadius: isAtOrigin ? "50%" : "32px",
          border: "1px solid rgba(255,255,255,0.12)",
          padding: isAtOrigin ? "0px" : "28px",
          width: isAtOrigin ? "60px" : "260px",
          height: isAtOrigin ? "60px" : "auto",
          textAlign: "center", cursor: "pointer",
          overflow: "hidden",
          transform: isAtOrigin
            ? `translate(${offsetX}px, ${offsetY}px) scale(0.9)`
            : "translate(0, 0) scale(1)",
          opacity: phase === "entering" ? 0.5 : phase === "exiting" ? 0 : 1,
          transition: [
            "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            "opacity 0.35s ease",
            "width 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            "height 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            "border-radius 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            "padding 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          ].join(", "),
          boxShadow: isAtOrigin
            ? "0 0 0 rgba(0,0,0,0)"
            : "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
        }}
      >
        <div style={{
          opacity: phase === "open" ? 1 : 0,
          transition: "opacity 0.3s ease 0.15s",
          pointerEvents: phase === "open" ? "auto" : "none",
        }}>
          <div style={{
            width: "88px", height: "88px", borderRadius: "50%", overflow: "hidden",
            margin: "0 auto 18px", border: "3px solid rgba(255,255,255,0.5)",
            boxShadow: "0 0 40px rgba(255,255,255,0.15)"
          }}>
            <SafeImage src={category.image} alt={category.name} />
          </div>
          <h3 style={{ fontSize: "22px", fontWeight: 700, margin: "0 0 6px", color: "#fff" }}>{category.name}</h3>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", margin: "0 0 22px" }}>
            {category.services.length} services
          </p>
          <div style={{
            padding: "14px 28px", borderRadius: "16px", background: "#fff", color: "#000",
            fontSize: "15px", fontWeight: 600, display: "inline-block"
          }}>
            Découvrir →
          </div>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)", margin: "16px 0 0", letterSpacing: "0.5px" }}>
            TOUCHER POUR OUVRIR
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Menu item — scannable, polished ─── */
function MenuItem({ service, index, onClick }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.1, rootMargin: "0px 0px -20px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const delay = index * 0.06;

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      onTouchCancel={() => setPressed(false)}
      style={{
        display: "flex",
        gap: "16px",
        padding: "12px",
        marginBottom: "10px",
        borderRadius: "20px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.06)",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transform: visible
          ? (pressed ? "scale(0.98)" : "scale(1)")
          : "translateY(20px)",
        boxShadow: pressed
          ? "0 2px 8px rgba(0,0,0,0.3)"
          : "0 4px 20px rgba(0,0,0,0.1)",
        transition: pressed
          ? "transform 0.15s ease, box-shadow 0.15s ease"
          : `transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, opacity 0.5s ease ${delay}s, box-shadow 0.3s ease`,
      }}
    >
      {/* Image */}
      <div style={{
        width: "88px", height: "88px",
        borderRadius: "16px", overflow: "hidden",
        flexShrink: 0, position: "relative",
      }}>
        <SafeImage src={service.image} alt={service.name} />
        <div style={{
          position: "absolute", inset: 0, borderRadius: "16px",
          boxShadow: "inset 0 0 12px rgba(0,0,0,0.25)",
          pointerEvents: "none",
        }} />
      </div>

      {/* Info */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        justifyContent: "center", minWidth: 0,
      }}>
        <h3 style={{
          fontSize: "16px", fontWeight: 600, margin: 0,
          lineHeight: 1.3, color: "rgba(255,255,255,0.9)",
          letterSpacing: "-0.1px",
          overflow: "hidden", textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
        }}>
          {service.name}
        </h3>

        <div style={{
          display: "flex", alignItems: "center", gap: "10px",
          marginTop: "10px",
        }}>
          <span style={{
            fontSize: "18px", fontWeight: 700, color: "#fff",
            letterSpacing: "-0.5px",
          }}>
            {service.price}
            <span style={{
              fontSize: "11px", fontWeight: 500,
              color: "rgba(255,255,255,0.35)", marginLeft: "2px",
            }}>DH</span>
          </span>

          <div style={{
            padding: "4px 10px", borderRadius: "100px",
            background: "rgba(255,255,255,0.06)",
            fontSize: "12px", fontWeight: 500,
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.3px",
          }}>
            {service.duration}
          </div>
        </div>
      </div>

      {/* Chevron */}
      <div style={{
        display: "flex", alignItems: "center", paddingRight: "4px",
        fontSize: "16px",
        color: pressed ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.15)",
        transition: "color 0.2s ease",
      }}>›</div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   ─── Services View — Hero Banner Header ───
   ═══════════════════════════════════════════ */
function ServicesView({ category, isExiting, onBack, onSelectService, backPressed, setBackPressed }) {
  const scrollRef = useRef(null);
  const [entered, setEntered] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const services = category?.services || [];
  const heroH = 240;

  // Entrance trigger
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Scroll tracking for parallax
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setScrollY(el.scrollTop);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollRatio = Math.min(scrollY / heroH, 1);
  const imgScale = 1.05 + scrollRatio * 0.1;
  const imgBrightness = 0.45 - scrollRatio * 0.2;
  const titleY = scrollRatio * -20;
  const titleOpacity = 1 - scrollRatio * 1.2;

  return (
    <div style={{
      height: "100vh",
      position: "relative",
      zIndex: 2,
      animation: isExiting ? "categoryExit 0.4s cubic-bezier(0.4, 0, 1, 1) forwards" : "zoomIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
    }}>
      {/* Scrollable content */}
      <div
        ref={scrollRef}
        data-scroll-container="true"
        style={{
          height: "100%", overflowY: "auto", overflowX: "hidden",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* ── Hero Banner ── */}
        <div style={{
          height: `${heroH}px`, position: "relative", overflow: "hidden",
        }}>
          {/* Background image — parallax zoom */}
          <div style={{
            position: "absolute", inset: "-30px",
            transform: `scale(${imgScale})`,
            filter: `brightness(${imgBrightness})`,
            willChange: "transform",
            opacity: entered ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}>
            <SafeImage src={category?.heroImage} alt="" />
          </div>

          {/* Gradient fade to black */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: "70%",
            background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 40%, #000 100%)",
            pointerEvents: "none",
          }} />

          {/* Back button — floating top left */}
          <button
            onClick={onBack}
            onTouchStart={() => setBackPressed(true)}
            onTouchEnd={() => setBackPressed(false)}
            onTouchCancel={() => setBackPressed(false)}
            onMouseDown={() => setBackPressed(true)}
            onMouseUp={() => setBackPressed(false)}
            style={{
              position: "absolute",
              top: "max(20px, env(safe-area-inset-top, 12px) + 8px)",
              left: "16px",
              zIndex: 10,
              width: "42px", height: "42px", borderRadius: "50%",
              border: "none",
              background: "rgba(0,0,0,0.3)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              color: "#fff", fontSize: "20px",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transform: backPressed ? "scale(0.88)" : "scale(1)",
              transition: "transform 0.15s ease",
              opacity: entered ? 1 : 0,
              transitionDelay: "0.15s",
            }}
          >←</button>

          {/* Title block — bottom of hero */}
          <div style={{
            position: "absolute",
            bottom: "24px", left: "20px", right: "20px",
            transform: `translateY(${titleY}px)`,
            opacity: Math.max(0, titleOpacity),
            willChange: "transform, opacity",
          }}>
            {/* Category thumbnail */}
            <div style={{
              width: "clamp(48px, 10vw, 64px)",
              height: "clamp(48px, 10vw, 64px)",
              borderRadius: "50%",
              overflow: "hidden",
              border: "3px solid rgba(255,255,255,0.2)",
              marginBottom: "16px",
              opacity: entered ? 1 : 0,
              transform: entered ? "scale(1) translateY(0)" : "scale(0.7) translateY(10px)",
              transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}>
              <SafeImage src={category?.image} alt="" />
            </div>

            {/* Category name */}
            <h1 style={{
              fontSize: "clamp(28px, 7vw, 40px)",
              fontWeight: 700,
              margin: 0,
              letterSpacing: "-1px",
              lineHeight: 1.1,
              opacity: entered ? 1 : 0,
              transform: entered ? "translateY(0)" : "translateY(14px)",
              transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
              textShadow: "0 2px 12px rgba(0,0,0,0.3)",
            }}>
              {category?.name}
            </h1>

            {/* Service count */}
            <p style={{
              fontSize: "clamp(12px, 2.8vw, 14px)",
              color: "rgba(255,255,255,0.4)",
              margin: "8px 0 0",
              fontWeight: 500,
              letterSpacing: "0.5px",
              opacity: entered ? 1 : 0,
              transition: "opacity 0.6s ease 0.4s",
            }}>
              {services.length} soins
            </p>
          </div>
        </div>

        {/* ── Menu items ── */}
        <div style={{ padding: "16px 12px 80px" }}>
          {services.map((service, index) => (
            <MenuItem
              key={service.id}
              service={service}
              index={index}
              onClick={() => onSelectService(service)}
            />
          ))}

          {/* End marker */}
          <div style={{
            textAlign: "center", padding: "20px 0 10px",
          }}>
            <div style={{
              width: "32px", height: "1px",
              background: "rgba(255,255,255,0.08)",
              margin: "0 auto",
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   ─── Main component ───
   ═══════════════════════════════════════════ */
export default function SalonMenu() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);
  const [isExiting, setIsExiting] = useState(false);
  const [orbitalExiting, setOrbitalExiting] = useState(false);
  const [backPressed, setBackPressed] = useState(false);
  const [previewCategory, setPreviewCategory] = useState(null);
  const [previewOrigin, setPreviewOrigin] = useState(null);

  const { radius, nodeSize } = useResponsiveRadius();
  const currentCategory = salonData.categories.find(c => c.id === selectedCategory);

  /* ─── Drag-to-rotate + momentum + snap ─── */
  const orbitRef = useRef(null);
  const angleRef = useRef(0);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartAngle = useRef(0);
  const dragStartRotation = useRef(0);
  const lastDragAngle = useRef(0);
  const lastDragTime = useRef(0);
  const momentumRaf = useRef(null);
  const didDrag = useRef(false);

  useEffect(() => { angleRef.current = rotationAngle; }, [rotationAngle]);

  const getAngleFromCenter = useCallback((clientX, clientY) => {
    if (!orbitRef.current) return 0;
    const rect = orbitRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return Math.atan2(clientY - cy, clientX - cx) * (180 / Math.PI);
  }, []);

  // Track touch start position to measure distance traveled
  const touchStartPos = useRef({ x: 0, y: 0 });
  const touchDistRef = useRef(0);
  const DRAG_THRESHOLD = 8; // pixels — below this counts as a tap

  const handlePointerDown = useCallback((e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    // Always start tracking, even on nodes
    isDraggingRef.current = true;
    didDrag.current = false;
    touchStartPos.current = { x: clientX, y: clientY };
    touchDistRef.current = 0;
    velocityRef.current = 0;
    if (momentumRaf.current) cancelAnimationFrame(momentumRaf.current);

    dragStartAngle.current = getAngleFromCenter(clientX, clientY);
    dragStartRotation.current = angleRef.current;
    lastDragAngle.current = dragStartAngle.current;
    lastDragTime.current = Date.now();
    setAutoRotate(false);
  }, [getAngleFromCenter]);

  const handlePointerMove = useCallback((e) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    // Track total pixel distance to distinguish drag from tap
    const dx = clientX - touchStartPos.current.x;
    const dy = clientY - touchStartPos.current.y;
    touchDistRef.current = Math.sqrt(dx * dx + dy * dy);

    if (touchDistRef.current > DRAG_THRESHOLD) {
      didDrag.current = true;
    }

    const currentAngle = getAngleFromCenter(clientX, clientY);
    let delta = currentAngle - dragStartAngle.current;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    const newAngle = (dragStartRotation.current + delta + 360) % 360;
    setRotationAngle(Number(newAngle.toFixed(3)));

    // Track velocity
    const now = Date.now();
    const dt = now - lastDragTime.current;
    if (dt > 0) {
      let angleDelta = currentAngle - lastDragAngle.current;
      if (angleDelta > 180) angleDelta -= 360;
      if (angleDelta < -180) angleDelta += 360;
      velocityRef.current = (angleDelta / dt) * 16;
    }
    lastDragAngle.current = currentAngle;
    lastDragTime.current = now;
  }, [getAngleFromCenter]);

  const snapToNearest = useCallback(() => {
    const total = salonData.categories.length;
    const step = 360 / total;

    const spring = () => {
      const current = angleRef.current;
      const target = Math.round(current / step) * step;
      let d = target - current;
      if (d > 180) d -= 360;
      if (d < -180) d += 360;

      if (Math.abs(d) < 0.15) {
        setRotationAngle(Number(((target + 360) % 360).toFixed(3)));
        if (!isDraggingRef.current) setAutoRotate(true);
        return;
      }
      const newA = (current + d * 0.14 + 360) % 360;
      setRotationAngle(Number(newA.toFixed(3)));
      momentumRaf.current = requestAnimationFrame(spring);
    };
    spring();
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    const vel = velocityRef.current;

    if (Math.abs(vel) > 0.3) {
      // Momentum phase
      let v = vel;
      const tick = () => {
        v *= 0.93;
        if (Math.abs(v) < 0.08) { snapToNearest(); return; }
        const newAngle = (angleRef.current + v + 360) % 360;
        setRotationAngle(Number(newAngle.toFixed(3)));
        momentumRaf.current = requestAnimationFrame(tick);
      };
      tick();
    } else {
      snapToNearest();
    }
  }, [snapToNearest]);

  // Passive:false touchmove for drag
  useEffect(() => {
    const el = orbitRef.current;
    if (!el) return;
    const onTouchMove = (e) => { if (isDraggingRef.current) handlePointerMove(e); };
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => el.removeEventListener("touchmove", onTouchMove);
  }, [handlePointerMove]);

  useEffect(() => { return () => { if (momentumRaf.current) cancelAnimationFrame(momentumRaf.current); }; }, []);

  /* ─── Slow auto-rotate when idle ─── */
  useEffect(() => {
    let timer;
    if (autoRotate && !selectedCategory && !previewCategory) {
      timer = setInterval(() => {
        if (!isDraggingRef.current) {
          setRotationAngle(prev => Number(((prev + 0.15) % 360).toFixed(3)));
        }
      }, 50);
    }
    return () => { if (timer) clearInterval(timer); };
  }, [autoRotate, selectedCategory, previewCategory]);

  /* ─── Position calculator ─── */
  const calculateNodePosition = useCallback((index, total) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));
    return { x, y, angle, zIndex, opacity };
  }, [rotationAngle, radius]);

  /* ─── Touch device detection ─── */
  const isTouchDevice = useRef(false);
  useEffect(() => { isTouchDevice.current = "ontouchstart" in window || navigator.maxTouchPoints > 0; }, []);

  /* ─── Navigate to category with zoom transition ─── */
  const navigateToCategory = useCallback((categoryId) => {
    setOrbitalExiting(true);
    setAutoRotate(false);
    setTimeout(() => {
      setSelectedCategory(categoryId);
      setOrbitalExiting(false);
    }, 350);
  }, []);

  /* ─── Node tap: preview on touch, direct on desktop ─── */
  const handleNodeClick = (category, e) => {
    if (didDrag.current) return;
    if (isTouchDevice.current) {
      // Get the image circle's screen position for animation origin
      const nodeEl = e.currentTarget.querySelector("[data-node-image]") || e.currentTarget;
      const rect = nodeEl.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      setAutoRotate(false);
      setPreviewOrigin({ x: cx, y: cy });
      setPreviewCategory(category);
    } else {
      navigateToCategory(category.id);
    }
  };

  const handlePreviewConfirm = () => {
    if (previewCategory) {
      const id = previewCategory.id;
      setPreviewCategory(null);
      setPreviewOrigin(null);
      navigateToCategory(id);
    }
  };
  const handlePreviewDismiss = () => { setPreviewCategory(null); setPreviewOrigin(null); setAutoRotate(true); };

  const handleBack = () => {
    setIsExiting(true);
    setTimeout(() => {
      setSelectedCategory(null);
      setSelectedService(null);
      setIsExiting(false);
      setAutoRotate(true);
    }, 400);
  };

  /* ═══════════════════════════════════════════ */
  return (
    <div style={{
      minHeight: "100vh", background: "#000",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif",
      color: "#fff", overflow: "hidden",
      touchAction: selectedCategory ? "auto" : "none"
    }}>

      {/* ════════ Orbital View ════════ */}
      {!selectedCategory && (
        <div style={{
          width: "100%", height: "100vh", minHeight: "580px",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          position: "relative",
          animation: orbitalExiting ? "orbitDepart 0.35s cubic-bezier(0.4, 0, 1, 1) forwards"
            : "orbitReturn 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          userSelect: "none", WebkitUserSelect: "none",
        }}>
          {/* Header */}
          <div style={{ position: "absolute", top: "60px", textAlign: "center", zIndex: 10 }}>
            <p style={{
              fontSize: "11px", color: "rgba(255,255,255,0.35)",
              letterSpacing: "4px", marginBottom: "8px", fontWeight: 500
            }}>BIENVENUE</p>
            <h1 style={{ fontSize: "28px", fontWeight: 700, letterSpacing: "-0.5px", margin: 0 }}>Glow Beauty</h1>
          </div>

          {/* Orbital Container — drag surface */}
          <div
            ref={orbitRef}
            onMouseDown={handlePointerDown}
            onMouseMove={handlePointerMove}
            onMouseUp={handlePointerUp}
            onMouseLeave={handlePointerUp}
            onTouchStart={handlePointerDown}
            onTouchEnd={handlePointerUp}
            onTouchCancel={handlePointerUp}
            style={{
              position: "relative",
              width: `${radius * 2 + nodeSize + 80}px`,
              maxWidth: "100%",
              height: `${radius * 2 + nodeSize + 80}px`,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "grab",
            }}
          >
            {/* Center Hub */}
            <div style={{
              position: "absolute",
              width: "64px", height: "64px", borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 10, pointerEvents: "none"
            }}>
              <div style={{
                position: "absolute", width: "80px", height: "80px", borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.2)",
                animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite"
              }} />
              <div style={{
                position: "absolute", width: "96px", height: "96px", borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.1)",
                animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite", animationDelay: "0.5s"
              }} />
              <div style={{
                width: "32px", height: "32px", borderRadius: "50%",
                background: "rgba(255,255,255,0.8)", backdropFilter: "blur(10px)"
              }} />
            </div>

            {/* Orbit Ring */}
            <div style={{
              position: "absolute",
              width: `${radius * 2}px`, height: `${radius * 2}px`,
              borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)",
              pointerEvents: "none"
            }} />

            {/* Orbital Nodes */}
            {salonData.categories.map((category, index) => {
              const position = calculateNodePosition(index, salonData.categories.length);
              const isActive = hoveredId === category.id || previewCategory?.id === category.id;

              return (
                <div
                  key={category.id}
                  data-node="true"
                  onClick={(e) => handleNodeClick(category, e)}
                  onMouseEnter={() => { setHoveredId(category.id); setAutoRotate(false); }}
                  onMouseLeave={() => { setHoveredId(null); setAutoRotate(true); }}
                  style={{
                    position: "absolute",
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    zIndex: isActive ? 200 : position.zIndex,
                    opacity: isActive ? 1 : position.opacity,
                    transition: isDraggingRef.current ? "none" : "opacity 0.5s ease, z-index 0s",
                    cursor: "pointer",
                    padding: "16px", margin: "-16px",
                  }}
                >
                  {/* Glow */}
                  <div style={{
                    position: "absolute",
                    width: `${nodeSize * 1.5}px`, height: `${nodeSize * 1.5}px`,
                    top: "50%", left: "50%",
                    marginTop: `${-nodeSize * 0.75}px`, marginLeft: `${-nodeSize * 0.75}px`,
                    borderRadius: "50%",
                    background: isActive
                      ? "radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)"
                      : "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                    pointerEvents: "none"
                  }} />

                  {/* Image Node */}
                  <div data-node-image="true" style={{
                    width: `${nodeSize}px`, height: `${nodeSize}px`,
                    borderRadius: "50%", overflow: "hidden",
                    border: isActive ? "3px solid #fff" : "2px solid rgba(255,255,255,0.4)",
                    boxShadow: isActive
                      ? "0 0 30px rgba(255,255,255,0.4)"
                      : "0 4px 20px rgba(0,0,0,0.4)",
                    transition: "all 0.3s ease",
                    transform: isActive ? "scale(1.15)" : "scale(1)"
                  }}>
                    <SafeImage src={category.image} alt={category.name} />
                  </div>

                  {/* Label — only visible on active node */}
                  <div style={{
                    position: "absolute",
                    top: `calc(50% + ${nodeSize / 2 + 10}px)`,
                    left: "50%", transform: "translateX(-50%)",
                    whiteSpace: "nowrap",
                    fontSize: nodeSize >= 70 ? "13px" : "11px",
                    fontWeight: 600, letterSpacing: "0.5px",
                    color: "#fff",
                    opacity: isActive ? 1 : 0,
                    transition: "opacity 0.3s ease",
                    textShadow: "0 0 10px rgba(255,255,255,0.5)",
                    pointerEvents: "none"
                  }}>
                    {category.name}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom hint */}
          <div style={{ position: "absolute", bottom: "50px", textAlign: "center" }}>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)", letterSpacing: "1px", margin: "0 0 8px" }}>
              Glissez pour explorer
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "4px", opacity: 0.2 }}>
              <div style={{ width: "20px", height: "2px", background: "#fff", borderRadius: "1px" }} />
              <div style={{ width: "6px", height: "2px", background: "#fff", borderRadius: "1px" }} />
            </div>
          </div>
        </div>
      )}

      {/* ════════ Tap-to-Preview ════════ */}
      {previewCategory && (
        <PreviewCard category={previewCategory} origin={previewOrigin} onConfirm={handlePreviewConfirm} onDismiss={handlePreviewDismiss} />
      )}

      {/* ════════ Services View ════════ */}
      {selectedCategory && (
        <ServicesView
          category={currentCategory}
          isExiting={isExiting}
          onBack={handleBack}
          onSelectService={setSelectedService}
          backPressed={backPressed}
          setBackPressed={setBackPressed}
        />
      )}

      {/* ════════ Service Detail — Stories Viewer ════════ */}
      {selectedService && (
        <StoryViewer
          service={selectedService}
          categoryName={currentCategory?.name}
          onClose={() => setSelectedService(null)}
        />
      )}

      <style>{`
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        @keyframes fadeDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(60px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes zoomIn { from { opacity: 0; transform: scale(1.1); } to { opacity: 1; transform: scale(1); } }
        @keyframes categoryExit {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.92); }
        }
        @keyframes orbitReturn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
        @keyframes orbitDepart { from { opacity: 1; transform: scale(1); } to { opacity: 0; transform: scale(1.15); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }
        @keyframes ping { 75%, 100% { transform: scale(1.5); opacity: 0; } }
        @keyframes spin { to { transform: rotate(360deg); } }
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
