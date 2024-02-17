import RegisterComponentLink from "../components/register-link";

const Register = () => {
    return (
        <main className="m-auto flex flex-col gap-6 items-center justify-center pt-20">
                <h1 className="text-4xl tracking-wide">Create your first ticket</h1>
          <RegisterComponentLink/>
        </main>
    );
}

export default Register;