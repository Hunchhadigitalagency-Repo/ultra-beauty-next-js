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
    <Dialog open={isOpen} onOpenChange={() =>{}}>
      <DialogContent className="flex flex-col items-center gap-4">
        <SectionHeader
          title="Make Payment"
          description="Scan the QR to complete payment"
        />

        {qrPayment.error && (
          <p className="text-red-500">{qrPayment.error}</p>
        )}

        {qrPayment.loading && (
          <p className="text-gray-500">Generating QR code...</p>
        )}

        {!qrPayment.loading &&
          !qrPayment.error &&
          qrPayment.dynamicOrImg && (
            <QRCode value={qrPayment.dynamicOrImg} size={200} />
          )}

        {!qrPayment.loading &&
          !qrPayment.error &&
          !qrPayment.dynamicOrImg && (
            <p className="text-gray-400">Waiting for payment data...</p>
          )}
      </DialogContent>
    </Dialog>
  );
};

export default QrPaymentModal;
