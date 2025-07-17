import React, { useState } from 'react';

/*
===============================================================================
                    SIMPLE GUIDE: PROPS & STATE TYPING
===============================================================================

This is a beginner-friendly guide to understand how to type props and state
in React with TypeScript.

WHAT ARE PROPS?
- Props are data passed FROM parent TO child component
- Like passing parameters to a function

WHAT IS STATE?
- State is data that belongs TO the component itself
- Like variables that can change and cause re-renders

WHY DO WE NEED TYPING?
- Catch errors before they happen (at compile time, not runtime)
- Get better autocomplete and suggestions in your editor
- Make your code self-documenting
- Prevent bugs when working in teams
===============================================================================
*/

// ============================================================================
// 0. WHY DO WE NEED TYPING? (REAL EXAMPLES)
// ============================================================================

// WITHOUT TYPING (JavaScript) - Can cause runtime errors!
function BadGreeting(props) {
    return <h2>Hello, {props.name}!</h2>;
}
// Problems:
// - No autocomplete for props.name
// - No error if you forget to pass 'name'
// - No error if you pass wrong type (like a number)
// - No documentation of what props are expected

// WITH TYPING (TypeScript) - Catches errors early!
interface GoodGreetingProps {
    name: string;
    age?: number;
}

function GoodGreeting({ name, age }: GoodGreetingProps) {
    return (
        <div>
            <h2>Hello, {name}!</h2>
            {age && <p>You are {age} years old</p>}
        </div>
    );
}
// Benefits:
// - Autocomplete shows 'name' and 'age'
// - Error if you forget to pass 'name'
// - Error if you pass wrong type
// - Clear documentation of expected props

// ============================================================================
// 1. BASIC PROPS TYPING
// ============================================================================

// Define what type of props your component will receive 
interface GreetingProps {
	name: string;        // Required prop
	age?: number;        // Optional prop (the ? makes it optional)
}

// Component that receives props
function Greeting({ name, age }: GreetingProps) {
	return (
		<div>
			<h2>Hello, {name}!</h2>
			{age && <p>You are {age} years old</p>}
		</div>
	);
}

// Usage:
// <Greeting name="Alice" age={25} />
// <Greeting name="Bob" />  // age is optional, so this works too

// ============================================================================
// 2. BASIC STATE TYPING
// ============================================================================

// WITHOUT TYPING - Can cause confusing bugs!
function BadCounter() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('');
    
    const handleClick = () => {
        // setCount(name); // Oops! Setting number to string - no error caught!
        // This would cause a runtime error in JavaScript, but TypeScript catches it!
    };
    
    return (
        <div>
            <p>Count: {count}</p>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <button onClick={handleClick}>Set count to name</button>
        </div>
    );
}

// WITH TYPING - Catches type errors!
function GoodCounter() {
    const [count, setCount] = useState<number>(0);
    const [name, setName] = useState<string>('');
    
    const handleClick = () => {
        // setCount(name); // ❌ TypeScript error: can't assign string to number!
        setCount(parseInt(name) || 0); // ✅ Correct way
    };
    
    return (
        <div>
            <p>Count: {count}</p>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <button onClick={handleClick}>Set count to name</button>
        </div>
    );
}

// Simple state with primitive types
function Counter() {
	const [count, setCount] = useState<number>(0);        // number state
	const [name, setName] = useState<string>('');         // string state
	const [isActive, setIsActive] = useState<boolean>(false); // boolean state

	return (
		<div>
			<p>Count: {count}</p>
			<button onClick={() => setCount(count + 1)}>Add 1</button>
			
			<input
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder="Enter your name"
			/>
			
			<button onClick={() => setIsActive(!isActive)}>
				{isActive ? 'Turn Off' : 'Turn On'}
			</button>
		</div>
	);
}

// ============================================================================
// 3. OBJECT STATE TYPING
// ============================================================================

// Define the shape of your object
interface User {
	name: string;
	email: string;
	age: number;
}

function UserProfile() {
	// State with object type
	const [user, setUser] = useState<User>({
		name: 'John',
		email: 'john@example.com',
		age: 25
	});

	// Update specific properties
	const updateName = (newName: string) => {
		setUser({ ...user, name: newName });
	};

	return (
		<div>
			<h3>User Profile</h3>
			<p>Name: {user.name}</p>
			<p>Email: {user.email}</p>
			<p>Age: {user.age}</p>
			
			<button onClick={() => updateName('Jane')}>
				Change Name to Jane
			</button>
		</div>
	);
}

// ============================================================================
// 4. ARRAY STATE TYPING
// ============================================================================

// Define the shape of items in your array
interface TodoItem {
	id: number;
	text: string;
	completed: boolean;
}

function TodoList() {
	// State with array type
	const [todos, setTodos] = useState<TodoItem[]>([]);
	const [newTodo, setNewTodo] = useState<string>('');

	const addTodo = () => {
		if (newTodo.trim()) {
			const todo: TodoItem = {
				id: Date.now(),
				text: newTodo,
				completed: false
			};
			setTodos([...todos, todo]);
			setNewTodo('');
		}
	};

	return (
		<div>
			<h3>My Todo List</h3>
			<input
				value={newTodo}
				onChange={(e) => setNewTodo(e.target.value)}
				placeholder="Add new todo"
			/>
			<button onClick={addTodo}>Add</button>
			
			<ul>
				{todos.map(todo => (
					<li key={todo.id}>
						{todo.text} - {todo.completed ? 'Done' : 'Not done'}
					</li>
				))}
			</ul>
		</div>
	);
}

// ============================================================================
// 5. PROPS WITH EVENT HANDLERS
// ============================================================================

interface ButtonProps {
	text: string;
	onClick: () => void;  // Function that takes no parameters and returns nothing
	disabled?: boolean;
}

function Button({ text, onClick, disabled = false }: ButtonProps) {
	return (
		<button onClick={onClick} disabled={disabled}>
			{text}
		</button>
	);
}

// ============================================================================
// 6. REAL-WORLD BENEFITS EXAMPLES
// ============================================================================

// Example 1: Team Development
interface UserCardProps {
    user: {
        id: number;
        name: string;
        email: string;
        avatar?: string;
    };
    onEdit: (userId: number) => void;
    onDelete: (userId: number) => void;
}

function UserCard({ user, onEdit, onDelete }: UserCardProps) {
    return (
        <div>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <button onClick={() => onEdit(user.id)}>Edit</button>
            <button onClick={() => onDelete(user.id)}>Delete</button>
        </div>
    );
}

// Benefits for your team:
// 1. New developer knows exactly what props to pass
// 2. IDE shows autocomplete for user.name, user.email, etc.
// 3. Can't accidentally pass wrong data types
// 4. Clear documentation of what the component expects

// Example 2: API Data Handling
interface ApiResponse {
    data: User[];
    loading: boolean;
    error: string | null;
}

function UserList() {
    const [apiState, setApiState] = useState<ApiResponse>({
        data: [],
        loading: false,
        error: null
    });

    const fetchUsers = async () => {
        setApiState(prev => ({ ...prev, loading: true }));
        try {
            // Simulate API call
            const response = await fetch('/api/users');
            const users = await response.json();
            setApiState({ data: users, loading: false, error: null });
        } catch (error) {
            setApiState({ data: [], loading: false, error: 'Failed to fetch' });
        }
    };

    // Benefits:
    // 1. TypeScript ensures you handle all possible states
    // 2. Autocomplete for apiState.data, apiState.loading, etc.
    // 3. Can't accidentally access non-existent properties
}

// ============================================================================
// 7. MAIN DEMO COMPONENT
// ============================================================================

export default function SimplePropsStateDemo() {
	const handleClick = () => {
		alert('Button clicked!');
	};

	return (
		<div style={{ padding: '20px' }}>
			<h1>Simple Props & State Examples</h1>
			
			<section>
				<h2>Props Example</h2>
				<Greeting name="Alice" age={25} />
				<Greeting name="Bob" />
			</section>

			<section>
				<h2>State Examples</h2>
				<Counter />
				<UserProfile />
				<TodoList />
			</section>

			<section>
				<h2>Props with Events</h2>
				<Button text="Click Me!" onClick={handleClick} />
				<Button text="Disabled Button" onClick={handleClick} disabled={true} />
			</section>
		</div>
	);
}

/*
===============================================================================
                            QUICK REFERENCE
===============================================================================

PROPS TYPING:
interface MyProps {
    required: string;           // Must provide this
    optional?: number;          // Can skip this
    onAction: () => void;       // Function prop
}

function MyComponent({ required, optional, onAction }: MyProps) {
    // Your component code
}

STATE TYPING:
const [count, setCount] = useState<number>(0);           // Number state
const [name, setName] = useState<string>('');            // String state
const [user, setUser] = useState<User>({...});           // Object state
const [items, setItems] = useState<Item[]>([]);          // Array state

KEY POINTS:
1. Always define interfaces for your props
2. Use ? for optional props
3. Always type your useState when TypeScript can't guess the type
4. Use descriptive names for your interfaces

WHY TYPING MATTERS:
✅ Catches errors before they reach users
✅ Better autocomplete and suggestions
✅ Self-documenting code
✅ Easier team collaboration
✅ Prevents runtime crashes
✅ Faster development with confidence
===============================================================================
*/
