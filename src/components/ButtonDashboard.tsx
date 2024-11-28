import { Button } from "./Button"

interface ButtonDashboardProps {
    isPreviousDisabled: boolean;
    isNextDisabled: boolean;
    onPreviousClick: () => void;
    onNextClick: () => void;
    onSaveClick: () => void;
    onCancelClick: () => void;
}

export const ButtonDashboard = ({ onPreviousClick, onNextClick, isPreviousDisabled, isNextDisabled, onSaveClick, onCancelClick }: ButtonDashboardProps) => {
    return (
        <div className="w-full sm:w-96">
            <div className='flex gap-4 mt-6'>
                <Button onClick={onPreviousClick} disabled={isPreviousDisabled} className="w-1/2 bg-secondary-variant">
                    Previous
                </Button>
                <Button onClick={onNextClick} disabled={isNextDisabled} className="w-1/2 bg-primary-variant">
                    Next
                </Button>
            </div>
            <div className='flex gap-4 mt-6'>
                <Button onClick={onCancelClick} className="w-1/2 bg-red-800">
                    Cancel
                </Button>
                <Button onClick={onSaveClick} className='w-1/2 bg-success'>
                    Save PDF
                </Button>
            </div>
        </div>
    )
}