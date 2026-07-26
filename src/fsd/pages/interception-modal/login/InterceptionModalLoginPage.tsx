import { LoginForm } from '@FsdFeatures/login/ui';
import { InterceptionModal } from '@FsdShared/modal/ui';

export default function InterceptionModalLoginPage() {
  return (
    <InterceptionModal maxWidth={500} maxHeight={500}>
      <LoginForm isInterceptionPage />
    </InterceptionModal>
  );
}
