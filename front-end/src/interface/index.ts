export interface OnCompletedProps {
  onCompleted: ()=>void;
}

export interface StepCompletedProps extends OnCompletedProps {
  stepText: string;
}