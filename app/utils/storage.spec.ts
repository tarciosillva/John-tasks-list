import "@testing-library/jest-dom";
import { ITodos } from '../@type';

class LocalStorageMock {
    store: Record<string, string>;

    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    getItem(key: string) {
        return this.store[key] || null;
    }

    setItem(key: string, value: string) {
        this.store[key] = value.toString();
    }

    removeItem(key: string) {
        delete this.store[key];
    }
}

var localStorageMock = new LocalStorageMock();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe('updateTodo', () => {
    const updateTodo = jest.fn((todos: ITodos[]) => {
        try {
            const todoJSON = JSON.stringify(todos);
            localStorageMock.setItem('todo', todoJSON);
        } catch (error) {
            console.error('Error while updating todos:', error);
        }
    });
    test('Updates todos in localStorage', () => {
        const mockTodos: ITodos[] = [{ id: Date.now(), checked: false, name: "My task", subTasks: [{ id: Date.now(), name: "My sub-task", checked: false }] }];
        updateTodo(mockTodos);
        const todoJSON = JSON.stringify(mockTodos);
        expect(localStorageMock.setItem('todo', todoJSON)).toHaveBeenCalled;
        expect(localStorageMock.getItem('todo')).toEqual(todoJSON)
    });

    test('Handles localStorage set error', () => {
        const consoleErrorSpy = jest.spyOn(console, 'error');
        consoleErrorSpy.mockImplementation(() => { });

        const mockTodos: ITodos[] = [
            {
                id: Date.now(),
                checked: false,
                name: "My task",
                subTasks: [{ id: Date.now(), name: "My sub-task", checked: false }],
            },
        ];

        const updateTodoWithError = () => {
            throw new Error('localStorage set error');
        };
        jest.spyOn(localStorageMock, 'setItem').mockImplementation(updateTodoWithError);

        updateTodo(mockTodos);

        expect(console.error).toHaveBeenCalledWith(
            'Error while updating todos:',
            expect.any(Error)
        );

        consoleErrorSpy.mockRestore();
        (localStorageMock.setItem as jest.Mock).mockRestore();
    });
});

describe('getAllTodos', () => {
    let consoleErrorSpy: jest.SpyInstance;

    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error');
        consoleErrorSpy.mockImplementation(() => { });
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    const getAllTodos = jest.fn((): ITodos[] | [] => {
        try {
            const storedTodoJSON = localStorageMock.getItem('todo');
            if (storedTodoJSON) {
                const storedTodo = JSON.parse(storedTodoJSON) as ITodos[];
                return storedTodo;
            }
        } catch (error) {
            console.error('Error while getting todos:', error);
        }
        return [];
    })

    it('returns an empty array when localStorage is empty', () => {
        jest.spyOn(localStorageMock, 'getItem').mockReturnValueOnce(null);
        const result = getAllTodos();
        expect(result).toEqual([]);
        expect(localStorageMock.getItem).toHaveBeenCalledWith('todo');
    });

    it('returns parsed todos from localStorage', () => {
        const mockTodos = [{ id: 1, title: 'Todo 1' }, { id: 2, title: 'Todo 2' }];
        const storedTodoJSON = JSON.stringify(mockTodos);
        jest.spyOn(localStorageMock, 'getItem').mockReturnValueOnce(storedTodoJSON);

        const result = getAllTodos();

        expect(result).toEqual(mockTodos);
        expect(localStorageMock.getItem).toHaveBeenCalledWith('todo');
    });

    it('handles JSON parsing error', () => {
        jest.spyOn(localStorageMock, 'getItem').mockReturnValueOnce('invalid json');

        const result = getAllTodos();

        expect(result).toEqual([]);
        expect(console.error).toHaveBeenCalledWith(
            'Error while getting todos:',
            expect.any(Error)
        );
    });
});
