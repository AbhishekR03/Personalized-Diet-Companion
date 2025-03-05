import { Input } from "./Input";
import { Label } from "./Label";
import { Button } from "./Button";

const AuthForm = ({ title, description, children, handleSubmit }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-md p-6">
        <h2 className="text-2xl font-bold text-center">{title}</h2>
        <p className="text-gray-600 text-center">{description}</p>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {children}
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
