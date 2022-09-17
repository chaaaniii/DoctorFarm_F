import styled from "styled-components";

export default function Pagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);
  const goToTop =()=>{
    window.scrollTo(0,0);
  }
  const onClickHandlerPre = () => {
    setPage(page -1)
    goToTop()
  }
  const onClickHandler = (i) => {
    setPage(i +1)
    goToTop()
  }
  const onClickHandlerAft = () => {
    setPage(page + 1)
    goToTop()
  }

  return (
    <>
      <Nav>
        <Button onClick={onClickHandlerPre} disabled={page === 1}>
          <div>&lt;</div>
        </Button>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => {onClickHandler(i)} }
              aria-current={page === i + 1 ? "page" : null}
            >
              <div>{i + 1}</div>
            </Button>
          ))}
        <Button onClick={onClickHandlerAft} disabled={page === numPages}>
        <div>&gt;</div>
        </Button>
      </Nav>
    </>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  border: none;
  border-radius: 10px;
  padding: 8px;
  margin: 0;
  background: black;
  color: white;
  font-size: 1rem;


  &:hover {
    background: blue;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;

  }

  &[aria-current] {
    background: #337ab7;
    font-weight: bold;
    cursor: revert;
    transform: revert;
    color: white
  }
`;

