interface ErrorPlaceholderProps {
    fetch: Function;
}

function ErrorPlaceholder(props: ErrorPlaceholderProps) {
    return (
        <div class="errorMessage">
            Oops, there is no internet connection

            <button onClick={() => props.fetch()}>Retry</button>
        </div>
    )
}

export default ErrorPlaceholder