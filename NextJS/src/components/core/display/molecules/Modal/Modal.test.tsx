import { fireEvent, render } from "@testing-library/react";
import { ReactNode } from "react";
import Modal from ".";

function ModalWrap(props: {
  children: ReactNode | ReactNode[];
  isOpen: boolean;
  onClose: () => {};
  doNotUmount: boolean;
}) {
  return (
    <div id="modal-core">
      <Modal
        isOpen={props.isOpen}
        onClose={props.onClose}
        doNotUmount={props.doNotUmount}
      >
        {props.children}
      </Modal>
    </div>
  );
}

export default describe("<Modal />", () => {
  test("Render Modal", () => {
    const mockClose = jest.fn();

    const component = render(
      <ModalWrap isOpen={false} onClose={mockClose} doNotUmount={true}>
        "ok"
      </ModalWrap>
    );

    expect(component.queryByText("ok")).toBe(null);

    component.rerender(
      <ModalWrap isOpen={true} onClose={mockClose} doNotUmount={true}>
        "ok"
      </ModalWrap>
    );

    component.findByText("ok");
    expect(mockClose).not.toBeCalled();
    // Check  that the component closes on
    fireEvent.click(component.getByTestId("modal-bg"));
    expect(mockClose).toBeCalled();
    fireEvent.click(component.getByTestId("modal-close-btn"));
    expect(mockClose).toBeCalledTimes(2);

    // On hide does not unmount
    component.rerender(
      <ModalWrap isOpen={false} onClose={mockClose} doNotUmount={true}>
        "Not OK"
      </ModalWrap>
    );

    component.findByText("Not OK");

    component.rerender(
      <ModalWrap isOpen={false} onClose={mockClose} doNotUmount={false}>
        "Not OK"
      </ModalWrap>
    );

    expect(component.queryByText("Not OK")).toBe(null);
  });
});
