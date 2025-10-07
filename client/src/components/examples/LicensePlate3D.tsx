import LicensePlate3D from '../LicensePlate3D';

export default function LicensePlate3DExample() {
  return (
    <div className="p-6 bg-background space-y-6">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Turkey Standard</p>
        <LicensePlate3D plateNumber="34 ABC 123" country="TR" />
      </div>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Germany Standard</p>
        <LicensePlate3D plateNumber="B MW 420" country="DE" />
      </div>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">USA Standard</p>
        <LicensePlate3D plateNumber="ABC 1234" country="US" />
      </div>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Carbon Fiber (VIP)</p>
        <LicensePlate3D plateNumber="FIRST2" country="TR" style="carbon" />
      </div>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Chrome (VIP)</p>
        <LicensePlate3D plateNumber="TURBO" country="DE" style="chrome" />
      </div>
    </div>
  );
}
