//a simple functional component that returns a h1 element.
// it is a function that returns a jsx element(Basic Example (Without TypeScript))
function HelloWorld() {
	return <h1>Hello, World!</h1>;
}
//Difference between regular function and functional component

// | **Aspect**                      | **Regular Function**                            | **Functional Component** |
// | ------------------------------- | ----------------------------------------------- | ------------------------ |
// | RETURN VALUE                    |Any value (`number`, `string`, `object`, etc.)   | 🌟JSX or `ReactNode`     |
// | Purpose                         | General-purpose logic (calculations, utilities) | Defines part of a UI     |
// | Can use hooks (e.g. `useState`) | ❌ No                                          | ✅ Yes                  |

/*TYPESCRIPT FUNCTIONAL COMPONENTS*/

//1. Typing Props with an interface
// Interface : Interface is used to create a "shape or structure of object"
//  (i call it frame😁 for my understanding) because whenever you have to create
// an object just use that variable to this frame and now you are free to use all
// keys  from that interface for assigning values

// As you see overall structure of this interface ,  same as object right?
interface HelloProps {
	//here we declared a interface for props
	name: string; // here you can see that key(variables) and values(types)
	age?: number; //optional prop
	children?: React.ReactNode;
} // why we use this interface ?
// ANS: We using react + Typescript so we need to describe the types of props (need of type in TypeScript)😒 otherwise errorrrr

function Hello({ name, age }: HelloProps) {
	// as you know simple function looks like this Hello() {}
	//but you can see that in the parameter we passed {name, age}: HelloProps this means that types of name and age
	//are described in the interface HelloProps so compiler don't trouble for type of name and age
	return (
		<div>
			<p>Hello, {name}!</p>
			{age && <p>Age: {age}</p>}
		</div>
	);
}

//2. Using React.FC (FunctionComponent)
// const Hello2: React.FC<HelloProps> = ({ name, age , children}) => (
//     <div>
//         <p>Hello, {name}!</p>
//         {age && <p>Age: {age}</p>}
//         {children}
//     </div>
// )
//2.1 Using React.FC (FunctionComponent) trying to do without arrow Fucnction
//converted arrow function to normal function
const Hello2: React.FC<HelloProps> = function ({ name, age, children }) {
	//by using function keyword and then removed arrow
	// and uses return keyword
	return (
		<div>
			<p>Hello, {name}!</p>
			{age && <p>Age: {age}</p>}
			{children}
		</div>
	);
};
