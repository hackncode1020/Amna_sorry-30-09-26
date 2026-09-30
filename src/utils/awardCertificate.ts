/**
 * High-res Award Certificate Generator for Amna
 * Draws an official, golden double-bordered certificate directly onto an HTML5 Canvas.
 * No external images or server calls required.
 */

export interface AwardData {
  sisterName: string;
  dateStr: string;
}

export function generateAwardCertificateDataUrl(data: AwardData): string {
  const canvas = document.createElement('canvas');
  const width = 1600;
  const height = 1130;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // 1. Soft Cream / Ivory Gradient Background
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#FFFDF8');
  bgGrad.addColorStop(0.5, '#FFF7F2');
  bgGrad.addColorStop(1, '#FFF2EB');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Outer Soft Blush Frame
  ctx.save();
  ctx.strokeStyle = '#FBCFE8';
  ctx.lineWidth = 14;
  ctx.strokeRect(30, 30, width - 60, height - 60);

  // Inner Golden Double Border
  const goldGrad = ctx.createLinearGradient(0, 0, width, height);
  goldGrad.addColorStop(0, '#D4AF37');
  goldGrad.addColorStop(0.3, '#FFD700');
  goldGrad.addColorStop(0.7, '#D4AF37');
  goldGrad.addColorStop(1, '#AA7C11');

  ctx.strokeStyle = goldGrad;
  ctx.lineWidth = 4;
  ctx.strokeRect(55, 55, width - 110, height - 110);

  ctx.lineWidth = 1.5;
  ctx.strokeRect(65, 65, width - 130, height - 130);

  // 3. Corner Floral / Star Accents
  const corners = [
    { x: 75, y: 75, rot: 0 },
    { x: width - 75, y: 75, rot: 90 },
    { x: width - 75, y: height - 75, rot: 180 },
    { x: 75, y: height - 75, rot: 270 },
  ];

  corners.forEach(({ x, y, rot }) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rot * Math.PI) / 180);
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 45);
    ctx.quadraticCurveTo(0, 0, 45, 0);
    ctx.moveTo(0, 25);
    ctx.quadraticCurveTo(0, 0, 25, 0);
    ctx.stroke();

    ctx.fillStyle = '#E11D48';
    ctx.beginPath();
    ctx.arc(14, 14, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });

  // 4. Trophy Header
  ctx.textAlign = 'center';
  ctx.fillStyle = '#E11D48';
  ctx.font = '72px sans-serif';
  ctx.fillText('🏆', width / 2, 160);

  // 5. Header Title
  ctx.fillStyle = '#9A3412';
  ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('★ OFFICIAL SISTERHOOD AWARD ★', width / 2, 215);

  ctx.fillStyle = '#831843';
  ctx.font = 'bold 64px "Cinzel", "Playfair Display", Georgia, serif';
  ctx.fillText('BEST SISTER AWARD', width / 2, 290);

  // 6. Subheading
  ctx.fillStyle = '#4B5563';
  ctx.font = 'italic 28px "Playfair Display", Georgia, serif';
  ctx.fillText('This award is proudly presented to', width / 2, 360);

  // 7. Amna's Name Banner
  const nameBoxY = 405;
  const nameBoxH = 100;
  const nameBoxW = 850;
  const nameBoxX = (width - nameBoxW) / 2;

  ctx.fillStyle = 'rgba(254, 242, 242, 0.75)';
  ctx.fillRect(nameBoxX, nameBoxY, nameBoxW, nameBoxH);
  ctx.strokeStyle = '#FDA4AF';
  ctx.lineWidth = 2;
  ctx.strokeRect(nameBoxX, nameBoxY, nameBoxW, nameBoxH);

  ctx.fillStyle = '#BE123C';
  ctx.font = 'bold 66px "Playfair Display", Georgia, serif';
  ctx.fillText(data.sisterName || 'AMNA 💗', width / 2, 475);

  // 8. Citation Paragraph
  ctx.fillStyle = '#374151';
  ctx.font = '30px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('For forgiving her annoying brother, having the biggest heart,', width / 2, 570);
  ctx.fillText('and officially being the', width / 2, 615);

  ctx.fillStyle = '#9F1239';
  ctx.font = 'bold 36px "Cinzel", Georgia, serif';
  ctx.fillText('BEST SISTER EVER 🏆💗', width / 2, 675);

  // 9. Pill Badge
  ctx.fillStyle = '#FFF1F2';
  ctx.beginPath();
  ctx.roundRect(width / 2 - 280, 720, 560, 56, 28);
  ctx.fill();
  ctx.strokeStyle = '#FDA4AF';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#9F1239';
  ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('⭐ Sister Level: LEGENDARY ⭐', width / 2, 756);

  // 10. Golden Seal
  const sealX = width / 2;
  const sealY = 890;

  // Ribbon tails
  ctx.fillStyle = '#BE123C';
  ctx.beginPath();
  ctx.moveTo(sealX - 35, sealY + 20);
  ctx.lineTo(sealX - 55, sealY + 110);
  ctx.lineTo(sealX - 35, sealY + 95);
  ctx.lineTo(sealX - 15, sealY + 110);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(sealX + 35, sealY + 20);
  ctx.lineTo(sealX + 15, sealY + 110);
  ctx.lineTo(sealX + 35, sealY + 95);
  ctx.lineTo(sealX + 55, sealY + 110);
  ctx.closePath();
  ctx.fill();

  // Seal circle
  const sealGrad = ctx.createRadialGradient(sealX - 10, sealY - 10, 5, sealX, sealY, 55);
  sealGrad.addColorStop(0, '#FFE082');
  sealGrad.addColorStop(0.5, '#F59E0B');
  sealGrad.addColorStop(1, '#B45309');
  ctx.fillStyle = sealGrad;
  ctx.beginPath();
  ctx.arc(sealX, sealY, 52, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#FDE68A';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.strokeStyle = '#92400E';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(sealX, sealY, 44, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#78350F';
  ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('OFFICIAL', sealX, sealY - 8);
  ctx.font = 'bold 20px "Cinzel", serif';
  ctx.fillText('100%', sealX, sealY + 12);
  ctx.font = 'bold 13px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('FORGIVEN', sealX, sealY + 28);

  // 11. Signatures & Date
  const leftX = 260;
  ctx.fillStyle = '#4B5563';
  ctx.font = '22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(data.dateStr, leftX, 940);
  ctx.strokeStyle = '#9CA3AF';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(leftX - 130, 955);
  ctx.lineTo(leftX + 130, 955);
  ctx.stroke();
  ctx.fillStyle = '#6B7280';
  ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('DATE OF FORGIVENESS', leftX, 985);

  const rightX = width - 260;
  ctx.fillStyle = '#881337';
  ctx.font = 'italic bold 36px "Caveat", cursive';
  ctx.fillText('Your Brother Abdaal ❤️', rightX, 940);
  ctx.strokeStyle = '#9CA3AF';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(rightX - 140, 955);
  ctx.lineTo(rightX + 140, 955);
  ctx.stroke();
  ctx.fillStyle = '#6B7280';
  ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('ALWAYS YOUR BROTHER — ABDAAL', rightX, 985);

  ctx.restore();
  return canvas.toDataURL('image/png');
}

export function downloadAwardCertificate(data: AwardData): { success: boolean; dataUrl: string } {
  try {
    const dataUrl = generateAwardCertificateDataUrl(data);
    if (!dataUrl) return { success: false, dataUrl: '' };

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `Best-Sister-Award-Amna.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return { success: true, dataUrl };
  } catch {
    const dataUrl = generateAwardCertificateDataUrl(data);
    return { success: false, dataUrl };
  }
}
