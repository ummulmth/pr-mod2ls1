function Button () {
    const handlePlay = () => {
        console.log("Selected");
    }
    return (
        <div class="btn-sel">
        <span>
            <button class="btn" type="button" onClick={handlePlay}>Select</button>
        </span>
        </div>
    );
}

export default Button;