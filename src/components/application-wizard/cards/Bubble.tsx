export function Bubble({children}: {children: React.ReactNode}) {
    //Bubble should act as a container for th other cards childs 
    //It should envolve other cards like <Bubble> <TextCard /> </Bubble>
    return (
        <div className="bubble-card bubble-entering">
            {children}
        </div>
    )
}