import React, { useState } from 'react'

const CustomAccordian = (props: any) => {
    const filterData = Object.values(props.data).filter((item: any) => item.props !== undefined);

    const [activeAccordian, setActiveAccordian] = useState<string>("");
    const handelAccordianClick = (id: string) => {
        if (activeAccordian === id) {
            setActiveAccordian("")
        } else {
            setActiveAccordian(id)
        }
    }
    return (
        <>
            <div className="ui__content">
                <div className="accordionBase">
                    <div className="accordion" id="accordionFAQ">
                        {filterData.map((item: any) => (
                            <div className="accordion-item" key={item.props.id}>
                                <h2 className="accordion-header">
                                    <button
                                        className={`accordion-button ${item.props.id === activeAccordian ? "" : 'collapsed'}`}
                                        type="button"
                                        data-bs-toggle="collapse"
                                        onClick={() => handelAccordianClick(item.props.id)}
                                    >
                                        {item.props.label}
                                    </button>
                                </h2>
                                <div
                                    className={`accordion-collapse collapse ${item.props.id === activeAccordian ? "show" : ''}`}
                                    data-bs-parent="#accordionFAQ"
                                >
                                    <div className="accordion-body">
                                        {item.props.children}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>

    )
}

export default CustomAccordian
