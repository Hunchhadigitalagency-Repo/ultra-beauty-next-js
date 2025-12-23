import SectionHeader from "@/components/common/header/section-header";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import QRCode from "react-qr-code";
import { QrPayment } from "../page";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  qrPayment: QrPayment;
}

const QrPaymentModal = ({ isOpen, qrPayment }: Props) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent showCloseButton={false} className="flex flex-col items-center justify-center p-8 sm:p-12 gap-6 text-center max-w-[400px]">
        
        <div className="space-y-2">
          <SectionHeader
            title="Make Payment"
            description="Scan the QR to complete payment"
          />
        </div>

        <div className="flex items-center justify-center min-h-[220px] w-full bg-slate-50 rounded-xl border border-dashed border-slate-200">
          {qrPayment.loading ? (
            <div className="flex flex-col items-center gap-2">
               <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
               <p className="text-sm text-muted-foreground">Generating QR code...</p>
            </div>
          ) : qrPayment.error ? (
            <p className="text-destructive font-medium px-4">{qrPayment.error}</p>
          ) : qrPayment.dynamicOrImg ? (
            <div className="p-2 bg-white rounded-lg shadow-sm">
               <QRCode value={qrPayment.dynamicOrImg} size={200} />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Waiting for payment data...</p>
          )}
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default QrPaymentModal;
