import './App.css';
import React, {useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import {
    numbers,
    upperCaseLetters,
    lowerCaseLetters,
    specialCharacters
} from "./characters";
import 'react-toastify/dist/ReactToastify.css';
import {COPY_SUCCESS} from "./message";

function App() {
    const [password, setPassword] = useState('')
    const [passwordLength, setPasswordLength] = useState(12)
    const [includeUppercase, setIncludeUppercase] = useState(true)
    const [includeLowercase, setIncludeLowercase] = useState(false)
    const [includeNumbers, setIncludeNumbers] = useState(false)
    const [includeSymbols, setIncludeSymbols] = useState(false)

    const handleGeneratePassword = (e) => {

        if (!includeUppercase && !includeLowercase && !includeSymbols && !includeNumbers) {
            notify('You must select at least one option', true)
        }
        let charactersList = ''

        if (includeUppercase) {
            charactersList = charactersList + upperCaseLetters
        }

        if (includeLowercase) {
            charactersList = charactersList + lowerCaseLetters
        }

        if (includeNumbers) {
            charactersList = charactersList + numbers
        }

        if (includeSymbols) {
            charactersList = charactersList + specialCharacters
        }

        setPassword(createPassword(charactersList))
    }

    const createPassword = (charactersList) => {
        let password = ''
        const charactersListLength = charactersList.length

        for (let i = 0; i < passwordLength; i++) {
            const characterIndex = Math.floor(Math.random() * charactersListLength)
            password = password + charactersList.charAt(characterIndex)
        }
        return password
    }

    const notify = (message, hasError = false) => {
        if (hasError) {
            toast.error(message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.success(message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    const copyToClipboard = () => {
        const newTextArea = document.createElement('textarea')
        newTextArea.innerText = password
        document.body.appendChild(newTextArea)
        newTextArea.select()
        document.execCommand('copy')
        newTextArea.remove()
    }

    const handleCopyPassword = (e) => {
        if (password === '') {
            notify('Nothing to copy', true)
        } else {
            copyToClipboard()
            notify(COPY_SUCCESS)
        }
    }

    return (
        <div className="App">
            <div className="container">
                <div className="generator">
                    <h2 className="generator__header">
                        Password Generator
                    </h2>
                    <div className="generator__password">
                        <h3>{password}</h3>
                        <button
                            onClick={handleCopyPassword}
                            className="copy__btn">
                            <i className="far fa-clipboard"/>
                        </button>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password-strength">Password length</label>
                        <input
                            defaultValue={passwordLength}
                            onChange={(e) => setPasswordLength(e.target.value)}
                            type="number"
                            id="password-strength"
                            name="password-strength"
                            min="8"
                            max="20"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="uppercase-letters">Include Uppercase Letters</label>
                        <input
                            checked={includeUppercase}
                            onChange={(e) => setIncludeUppercase(e.target.checked)}
                            type="checkbox"
                            id="uppercase-letters"
                            name="uppercase-letters"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="lowercase-letters">Include Lowercase Letters</label>
                        <input
                            checked={includeLowercase}
                            onChange={(e) => setIncludeLowercase(e.target.checked)}
                            type="checkbox"
                            id="lowercase-letters"
                            name="lowercase-letters"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="include-numbers">Include Numbers</label>
                        <input
                            checked={includeNumbers}
                            onChange={(e) => setIncludeNumbers(e.target.checked)}
                            type="checkbox"
                            id="include-numbers"
                            name="include-numbers"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="include-symbols">Include Symbols</label>
                        <input
                            checked={includeSymbols}
                            onChange={(e) => setIncludeSymbols(e.target.checked)}
                            type="checkbox"
                            id="include-symbols"
                            name="include-symbols"/>
                    </div>

                    <button
                        onClick={handleGeneratePassword}
                        className="generator__btn">
                        Generate Password
                    </button>

                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
