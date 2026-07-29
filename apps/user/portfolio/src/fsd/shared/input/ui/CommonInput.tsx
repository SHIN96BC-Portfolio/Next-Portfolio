import { ChangeEvent, FocusEvent, forwardRef, HTMLInputTypeAttribute } from 'react';

interface Props {
  type?: HTMLInputTypeAttribute;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

const CommonInput = forwardRef<HTMLInputElement, Props>(({ type, name, onChange, onBlur }, ref) => {
  return (
    <input
      ref={ref}
      name={name}
      type={type}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      onChange={onChange}
      onBlur={onBlur}
    />
  );
});

CommonInput.displayName = 'CommonInput';

export default CommonInput;
